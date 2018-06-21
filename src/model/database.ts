import Knex from 'knex'

async function getKnex() {
    return await Knex({
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
        filename: 'data/data.db'
        }
    })
}

export { getKnex }