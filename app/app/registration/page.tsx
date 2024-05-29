import { RegistrationClient } from './client'
import { postgres } from 'app/db'

export const metadata = {
    title: 'Registration - OLFU Student',
    description: `© 2024. Our Lady of Fatima University. All rights reserved.`,
}

export default async function Registration() {
    const classSchedQuery = await postgres.query(`SELECT * FROM class_sched`)
    const subjectsQuery = await postgres.query(`SELECT * FROM subjects`)
    const classesQuery = await postgres.query(`SELECT * FROM classes`)
    return <RegistrationClient classes={classesQuery.rows} subjects={subjectsQuery.rows} classScheds={classSchedQuery.rows} />
}
