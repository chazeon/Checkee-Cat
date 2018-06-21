import { Model } from 'objection'

interface IndexSignature {
    [key: string]: any
}

class Case extends Model implements IndexSignature {
    static get tableName () { return 'case' }

    public id: number | null = null
    public account_name: string | null = null

    public first_name: string | null = null
    public last_name: string | null = null

    public complete_date: Date | null = null
    public check_date: Date | null = null

    public visa_type: string | null = null
    public visa_entry: string | null = null
    public us_consulate: string | null = null
    public status: string | null = null

    public university_name: string | null = null
    public major_name: string | null = null
    public degree_name: string | null = null

    public employer_name: string | null = null 
    public job_title: string | null = null

    public years_in_usa: number | null = null
    public country_from: string | null = null

    public note: string | null = null
}

export { Case }