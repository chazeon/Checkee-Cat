import * as request from 'request-promise-native'
import * as request_promise from 'request-promise-native'
import * as cheerio from 'cheerio'
import _ from 'lodash'
import retry from 'async-retry'

import { Case } from './model/case'
import { table_fields } from './model/table'
import { isNull, isUndefined } from 'util';
import { getKnex } from './model/database'

function parseDetail(detail_html: string) {
    let $ = cheerio.load(detail_html)
    let field_regex = /^([^:]+): (.*)$/s
    let table = $('table')
    let table_items = $(table[2]).find('td')
    let currentCase = new Case()
    for (let i = 0; i < table_items.length; ++i) {
        let item_content = $(table_items[i]).text()
        let regex_result = item_content.match(field_regex)
        if (isNull(regex_result)) continue
        let table_field = _.find(table_fields, field => field.keyword === regex_result![1])
        if (isUndefined(table_field)) continue
        table_field.setter(currentCase, regex_result[2])
    }
    return currentCase
}

async function getFromDetail(id: number): Promise<Case> {
    return await request_promise.get({
        uri: `https://www.checkee.info/personal_detail.php?casenum=${id}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3452.0 Safari/537.36'
        },
        transform: parseDetail,
        timeout: 5000
    })
}

async function main() {
    let knex = await getKnex()
    let CaseKnex = Case.bindKnex(knex)

    let case_id = 0
    let empty_count = 0
    while (true) {
        ++case_id
        let savedCase = await CaseKnex.query().where('id', case_id)
        if (savedCase && savedCase.length > 0 && savedCase[0].status === 'clear') {
            console.log(`Skipping case #${case_id}`)
            continue
        }

        let updatedCase = await retry(async bait => {
            try {
                console.log(`Processing case #${case_id}`)
                let updatedCase = await getFromDetail(case_id)
                return updatedCase
            }
            catch (err) {
                if (err.name !== 'StatusCodeError' && err.name !== 'RequestError') {
                    console.log('Bait')
                    console.log(err)
                    bait(err)
                    return
                }
                else {
                    console.log(err)
                    throw(err)
                }
            }
        }, {
            retries: 5,
        })

        if (!updatedCase) return

        if (updatedCase.account_name === '') {
            if (case_id > 150000 && empty_count > 25) break
            else {
                ++empty_count
                continue
            }
        }

        if (savedCase && savedCase.length > 0) {
            await CaseKnex.query().where('id', case_id).update(updatedCase)
            console.log(updatedCase)
        }
        else {
            console.log(await CaseKnex.query().insert(updatedCase))
        }
        empty_count = 0
    }
    return 'Finished'
}

main()
.then(
    res => console.log(res),
    err => console.log(err)
)