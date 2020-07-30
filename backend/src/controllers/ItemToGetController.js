const connection = require('../database/connection');

module.exports = {
    async index(request, response) {

        const itemsToGet = await connection('itemsToGet')
            .select('*');

        return response.json(itemsToGet);
    },
    async create(request, response) {
        const username = request.headers.authorization;

        const {
            title,
            description,
            valuePerDay,
            daysNeeded,
            startDate,
            shouldMailIt,
            city,
            uf
        } = request.body;

        const [id] = await connection('itemsToGet')
            .insert({
                title,
                description,
                valuePerDay,
                daysNeeded,
                startDate,
                shouldMailIt,
                city,
                uf,
                username
            });

        return response.json({ id });
    },
    async delete(request, response) {
        const { id } = request.params;
        const username = request.headers.authorization;

        const item = await connection('itemsToGet')
            .where('id', id)
            .select('username')
            .first();

        if (item.username !== username) {
            return response.status(401).json({
                error: 'No authorization'
            });
        }

        await connection('itemsToGet').where('id', id).delete();

        return response.status(204).send();
    }
};
