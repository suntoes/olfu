import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { postgres } from 'app/db'

export async function POST(req: Request) {
    const jwt = headers().get('authorization')
    try {
        const { title, description } = await req.json()
        const jwtQuery = await postgres.query(`SELECT * FROM jwt WHERE id = $1 LIMIT 1;`, [jwt])
        const reportQuery = await postgres.query(
            `INSERT INTO reports (student_id, title, description) VALUES ($1, $2, $3) RETURNING *;`,
            [jwtQuery.rows[0].student_id, title, description],
        )
        return NextResponse.json(reportQuery.rows[0])
    } catch (e) {
        return NextResponse.json({ error: true, message: 'Something went wrong', log: JSON.stringify(e) })
    }
}
