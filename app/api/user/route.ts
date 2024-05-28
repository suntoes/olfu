import { postgres } from 'app/db'
import type { NextApiRequest } from 'next'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req: NextApiRequest) {
    try {
        const jwtQuery = await postgres.query(`SELECT * FROM jwt WHERE id = $1 LIMIT 1;`, [
            headers().get('authorization'),
        ])
        const studentProfileQuery = await postgres.query(
            `SELECT * FROM student_profiles WHERE student_id = $1 LIMIT 1;`,
            [jwtQuery.rows[0].student_id],
        )
        return NextResponse.json(studentProfileQuery.rows[0])
    } catch (e) {
        return NextResponse.json({ error: true, message: 'Something went wrong', log: JSON.stringify(e) })
    }
}
