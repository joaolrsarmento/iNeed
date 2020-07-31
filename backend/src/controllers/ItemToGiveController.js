const connection = require('../database/connection');

module.exports = {
    async index(request, response) {

        const itemsToGive = await connection('itemsToGive')
            .select('*');

        return response.json(itemsToGive);
    },
    async create(request, response) {
        const username = request.headers.authorization;

        const {
            title,
            description,
            valuePerDay,
            canMailIt,
            city,
            uf
        } = request.body;

        const [id] = await connection('itemsToGive')
            .insert({
                title,
                description,
                valuePerDay,
                city,
                uf,
                canMailIt,
                username
            });

        return response.json({ id });
    },async update(request, response) {
        const username = request.headers.authorization;
        const {item_id} = request.params;
        const {
            title,
            description,
            valuePerDay,
            canMailIt,
            city,
            uf
        } = request.body;

        const [id] = await connection('itemsToGet')
            .update({
                title,
                description,
                valuePerDay,
                city,
                uf,
                canMailIt,
                username
            }).where('id', item_id);

        return response.json({ id });
    },
    async delete(request, response) {
        const { id } = request.params;
        const username = request.headers.authorization;

        const item = await connection('itemsToGive')
            .where('id', id)
            .select('username')
            .first();

        if (item.username !== username) {
            return response.status(401).json({
                error: 'No authorization'
            });
        }

        await connection('itemsToGive').where('id', id).delete();

        return response.status(204).send();
    }
};
