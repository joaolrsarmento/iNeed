const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const {username, password} = request.body;

        const person = await connection('persons')
                             .where('username', username)
                             .select('*')
                             .first();
        
        if(!person || person.password !== password){
            return response.status(400).json(
                {error: 'Incorrect username or password. Try again.'}
            );
        }

        return response.json(person);
    }
}