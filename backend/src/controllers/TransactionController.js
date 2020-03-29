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

        console.log(item)
        const destinationUsername = item.username;

        let originUser = await connection('persons')
        .where('username', originUsername)
        .select('balance')
        .first();

        let destinationUser = await connection('persons')
        .where('username', destinationUsername)
        .select('balance')
        .first();

        destinationUser.balance += item.valuePerDay * item.daysNeeded;
        originUser.balance -= item.valuePerDay * item.daysNeeded;

        value = item.valuePerDay * item.daysNeeded;

        
        await connection('transactions').insert({
            originUsername,
            destinationUsername,
            date,
            value
        });

        return response.json({id})
    }
}