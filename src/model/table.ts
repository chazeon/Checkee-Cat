import { Case } from './case'
import _ from 'lodash'

class TableFieldSetter {
    keyword: string
    setter: (c: Case, s: string) => void

    constructor (keyword: string, setter: (c: Case, s: string) => void) {
        this.keyword = keyword
        this.setter = setter
    }
}

const table_fields: TableFieldSetter[] = [
    new TableFieldSetter('Checkee CaseNum',     (c: Case, v: string) => c.id = Number(v)),
    new TableFieldSetter('ID',                  (c: Case, v: string) => c.account_name = v),

    new TableFieldSetter('First Name',          (c: Case, v: string) => c.first_name = v),
    new TableFieldSetter('Last Name',           (c: Case, v: string) => c.last_name = v),

    new TableFieldSetter('Check Date',          (c: Case, v: string) => c.check_date = new Date(v)),
    new TableFieldSetter('Complete Date',       (c: Case, v: string) => c.complete_date = new Date(v)),

    new TableFieldSetter('Visa Type',           (c: Case, v: string) => c.visa_type = v),
    new TableFieldSetter('Visa Entry',          (c: Case, v: string) => c.visa_entry = v),
    new TableFieldSetter('US Consulate',        (c: Case, v: string) => c.us_consulate = v),
    new TableFieldSetter('Status',              (c: Case, v: string) => c.status = v.toLowerCase()),

    new TableFieldSetter('University(College)', (c: Case, v: string) => c.university_name = v),
    new TableFieldSetter('Major',               (c: Case, v: string) => c.major_name = v),
    new TableFieldSetter('Degree',              (c: Case, v: string) => c.degree_name = v),

    new TableFieldSetter('Employer',            (c: Case, v: string) => c.employer_name = v),
    new TableFieldSetter('Job Title',           (c: Case, v: string) => c.job_title = v),

    new TableFieldSetter('Years in Usa',        (c: Case, v: string) => c.years_in_usa = Number(v)),
    new TableFieldSetter('Country',             (c: Case, v: string) => c.country_from = v),

    new TableFieldSetter('Note',                (c: Case, v: string) => c.note = _.trim(v, '\t')),
]

export { TableFieldSetter, table_fields }
