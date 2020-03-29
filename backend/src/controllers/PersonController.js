const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const persons = await connection('persons').select('*');

        return response.json(persons);
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
            house_number
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
            house_number
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
