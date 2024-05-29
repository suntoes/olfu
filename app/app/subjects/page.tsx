import { SubjectClient } from './client'
import { postgres } from 'app/db'

export const metadata = {
    title: 'Subject - OLFU Student',
    description: `© 2024. Our Lady of Fatima University. All rights reserved.`,
}

export default async function Subject() {
    const classSchedQuery = await postgres.query(`SELECT * FROM class_sched`)
    const subjectsQuery = await postgres.query(`SELECT * FROM subjects`)
    const classesQuery = await postgres.query(`SELECT * FROM classes`)
    return <SubjectClient classes={classesQuery.rows} subjects={subjectsQuery.rows} classScheds={classSchedQuery.rows} />
}
