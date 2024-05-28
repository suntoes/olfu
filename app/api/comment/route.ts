import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { postgres } from 'app/db'

export async function POST(req: Request) {
    const jwt = headers().get('authorization')
    try {
        const jwtQuery = await postgres.query(`SELECT * FROM jwt WHERE id = $1 LIMIT 1;`, [jwt])
        const studentProfileQuery = await postgres.query(
            `SELECT * FROM student_profiles WHERE student_id = $1 LIMIT 1;`,
            [jwtQuery.rows[0].student_id],
        )
        const { postid, commentcontent } = await req.json()
        const commentQuery = await postgres.query(
            `INSERT INTO comments (postid, username, commentcontent) VALUES ($1, $2, $3) RETURNING *;`,
            [postid, studentProfileQuery.rows[0].username, commentcontent],
        )
        return NextResponse.json(commentQuery.rows[0])
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: true, message: 'Something went wrong', log: JSON.stringify(e) })
    }
}

export async function DELETE(req: Request) {
    const jwt = headers().get('authorization')
    try {
        const { commentid } = await req.json()
        const jwtQuery = await postgres.query(`SELECT * FROM jwt WHERE id = $1 LIMIT 1;`, [jwt])
        const studentProfileQuery = await postgres.query(
            `SELECT * FROM student_profiles WHERE student_id = $1 LIMIT 1;`,
            [jwtQuery.rows[0].student_id],
        )
        const commentQuery = await postgres.query(
            `DELETE FROM comments WHERE commentid = $1 AND username = $2 RETURNING *;`,
            [commentid, studentProfileQuery.rows[0].username],
        )

        return NextResponse.json(commentQuery.rows[0])
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: true, message: 'Something went wrong', log: JSON.stringify(e) })
    }
}
