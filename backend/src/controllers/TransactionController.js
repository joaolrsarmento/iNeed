const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const transactions = await connection('transactions').select('*');

        return response.json(transactions);
    },
    async create(request, response){
        const originUsername = request.headers.authorization;
        const {id} = request.params;
        const type = request.query.type;

        const {date} = request.body;

        const item = await connection(`itemsTo${String(type)}`)
        .where('id', id)
        .select('*')
        .first();

        const destinationUsername = item.username;
        let value = item.valuePerDay * item.daysNeeded;

        let originUser = await connection('persons')
        .where('username', originUsername)
        .select('balance')
        .first();

        let destinationUser = await connection('persons')
        .where('username', destinationUsername)
        .select('balance')
        .first();


        await connection('persons')
        .where('username', originUsername)
        .update('balance', originUser.balance - value)
        .then(() => {});

        await connection('persons')
        .where('username', destinationUsername)
        .update('balance', destinationUser.balance + value)
        .then(() => {});


        
        await connection('transactions').insert({
            originUsername,
            destinationUsername,
            date,
            value
        });

        return response.json({id})
    }
}