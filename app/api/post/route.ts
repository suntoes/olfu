import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { postgres } from 'app/db'

export async function POST(req: Request) {
    try {
        const { title, content } = await req.json()
        const jwtQuery = await postgres.query(`SELECT * FROM jwt WHERE id = $1 LIMIT 1;`, [
            headers().get('authorization'),
        ])
        const studentProfileQuery = await postgres.query(
            `SELECT * FROM student_profiles WHERE student_id = $1 LIMIT 1;`,
            [jwtQuery.rows[0].student_id],
        )
        const postQuery = await postgres.query(
            `INSERT INTO posts (username, title, content) VALUES ($1, $2, $3) RETURNING *;`,
            [studentProfileQuery.rows[0].username, title, content],
        )
        return NextResponse.json(postQuery.rows[0])
    } catch (e) {
        return NextResponse.json({ error: true, message: 'Something went wrong' })
    }
}

export async function PATCH(req: Request) {
    try {
        const { postid, title, content } = await req.json()
        const jwtQuery = await postgres.query(`SELECT * FROM jwt WHERE id = $1 LIMIT 1;`, [
            headers().get('authorization'),
        ])
        const studentProfileQuery = await postgres.query(
            `SELECT * FROM student_profiles WHERE student_id = $1 LIMIT 1;`,
            [jwtQuery.rows[0].student_id],
        )
        const postQuery = await postgres.query(
            `UPDATE posts SET title = $1, content = $2 WHERE postid = $3 AND username = $4 RETURNING *;`,
            [title, content, postid, studentProfileQuery.rows[0].username],
        )
        return NextResponse.json(postQuery.rows[0])
    } catch (e) {
        return NextResponse.json({ error: true, message: 'Something went wrong' })
    }
}

export async function DELETE(req: Request) {
    try {
        const { postid } = await req.json()
        const jwtQuery = await postgres.query(`SELECT * FROM jwt WHERE id = $1 LIMIT 1;`, [
            headers().get('authorization'),
        ])
        const studentProfileQuery = await postgres.query(
            `SELECT * FROM student_profiles WHERE student_id = $1 LIMIT 1;`,
            [jwtQuery.rows[0].student_id],
        )
        const postQuery = await postgres.query(`DELETE FROM posts WHERE postid = $1 AND username = $2 RETURNING *;`, [
            postid,
            studentProfileQuery.rows[0].username,
        ])
        return NextResponse.json(postQuery.rows[0])
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: true, message: 'Something went wrong' })
    }
}
