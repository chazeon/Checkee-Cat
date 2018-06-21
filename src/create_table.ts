import Knex from 'knex'
import { getKnex } from './model/database'

async function createTables(knex: Knex) {
    await knex.schema.createTable('case', table => {

        table.integer('id')
        table.string('account_name')

        table.string('first_name')
        table.string('last_name')

        table.date('check_date')
        table.date('complete_date')

        table.string('visa_type')
        table.string('visa_entry')
        table.string('us_consulate')
        table.string('status')

        table.string('university_name')
        table.string('major_name')
        table.string('degree_name')

        table.string('employer_name')
        table.string('job_title')

        table.integer('years_in_usa')
        table.string('country_from')

        table.string('note')

    })
    return knex
}

async function main(): Promise<void> {
    const knex = await getKnex()
    await createTables(knex)
}

main().then(() => {
    console.log('Succeed!')
})