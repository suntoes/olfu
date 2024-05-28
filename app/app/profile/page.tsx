import { cookies } from 'next/headers'
import { ProfileClient } from './client'
import { postgres } from 'app/db'

export const metadata = {
    title: 'Profile - OLFU Student',
    description: `© 2024. Our Lady of Fatima University. All rights reserved.`,
}

export default async function Profile() {
    const jwt = cookies().get('jwt')?.value
    const jwtQuery = await postgres.query(`SELECT * FROM jwt WHERE id = $1 LIMIT 1;`, [jwt])
    const studentProfileQuery = await postgres.query(`SELECT * FROM student_profiles WHERE student_id = $1 LIMIT 1;`, [jwtQuery.rows[0].student_id])

    return <ProfileClient user={studentProfileQuery.rows[0]} />
}
