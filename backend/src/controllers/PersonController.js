const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const persons = await connection('persons').select('*');

        return response.json(persons);
    },
    async clean(request, response){
        const a = await connection('itemsToGet').delete('*');
        const b = await connection('itemsToGive').delete('*');

        return response.json(a);
    },
    async items(request, response){
        const {username} = request.params;

        const toGive = await connection('itemsToGive').select('*').where('username', username);
        const toGet = await connection('itemsToGet').select('*').where('username', username);
        console.log([toGive, toGet]);
        return response.json([toGive, toGet]);
    },

    async create(request, response){
        const {
            username,
            password,
            first_name,
            last_name,
            phone,
            email,
            city,
            uf,
            zip_code,
            house_number,
            balance = 0
        } = request.body;


        await connection('persons').insert({
            username,
            password,
            first_name,
            last_name,
            phone,
            email,
            city,
            uf,
            zip_code,
            house_number,
            balance
        });

        return response.json({username});
    },
    async delete(request, response){
        const {username} = request.params;
        const loggedUsername = request.headers.authorization;

        if(loggedUsername !== username){
            return response.status(401).json({
                error: 'No authorization'
            });
        }

        await connection('persons').where('username', username).delete();

        return response.status(204).send();
    }
}
