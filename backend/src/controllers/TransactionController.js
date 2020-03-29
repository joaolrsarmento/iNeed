const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const transactions = await connection('transactions').select('*');

        return response.json(transactions);
    },
    async transactionToGet(request, response){
        const ownerUsername = request.headers.authorization;
        const {id} = request.params;


        const {date} = request.body;

        const item = await connection(`itemsToGet`)
        .where('id', id)
        .select('*')
        .first();

        const clientUsername = item.username;
        let value = item.valuePerDay * item.daysNeeded;

        let ownerUser = await connection('persons')
        .where('username', ownerUsername)
        .select('balance')
        .first();

        let clientUser = await connection('persons')
        .where('username', clientUsername)
        .select('balance')
        .first();


        await connection('persons')
        .where('username', ownerUser)
        .update('balance', ownerUsername.balance + value)
        .then(() => {});

        await connection('persons')
        .where('username', clientUsername)
        .update('balance', clientUser.balance - value)
        .then(() => {});


        
        await connection('transactions').insert({
            clientUsername,
            ownerUsername,
            date,
            value
        });

        return response.json({id})
    },
    async transactionToGive(request, response){
        const clientUsername = request.headers.authorization;
        const {id} = request.params;
        const {daysNeeded, date} = request.body;

        const item = await connection(`itemsToGive`)
        .where('id', id)
        .select('*')
        .first();


        const ownerUsername = item.username;
        let value = item.valuePerDay * daysNeeded;

        let clientUser = await connection('persons')
        .where('username', clientUsername)
        .select('balance')
        .first();

        let ownerUser = await connection('persons')
        .where('username', ownerUsername)
        .select('balance')
        .first();

        await connection('persons')
        .where('username', clientUsername)
        .update('balance', clientUser.balance - value)
        .then(() => {});

        await connection('persons')
        .where('username', ownerUsername)
        .update('balance', ownerUser.balance + value)
        .then(() => {});


        
        await connection('transactions').insert({
            clientUsername,
            ownerUsername,
            date,
            value
        });

        return response.json({id})
    }
}