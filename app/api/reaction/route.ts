import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { postgres } from 'app/db'

export async function POST(req: Request) {
    const jwt = headers().get('authorization')
    try {
        const { postid, commentid, reactiontype } = await req.json()
        const jwtQuery = await postgres.query(`SELECT * FROM jwt WHERE id = $1 LIMIT 1;`, [jwt])
        const studentProfileQuery = await postgres.query(
            `SELECT * FROM student_profiles WHERE student_id = $1 LIMIT 1;`,
            [jwtQuery.rows[0].student_id],
        )
        const reactionFindQuery = await postgres.query(
            `SELECT * FROM reactions WHERE ${commentid ? 'commentid' : 'postid'} = $1 AND username = $2 LIMIT 1;`,
            [commentid ? commentid : postid, studentProfileQuery.rows[0].username],
        )
        if (reactionFindQuery.rows[0]) {
            const reactionQuery = await postgres.query(
                `UPDATE reactions SET reactiontype = $1 WHERE reactionid = $2 RETURNING *;`,
                [reactiontype, reactionFindQuery.rows[0].reactionid],
            )
            return NextResponse.json(reactionQuery.rows[0])
        } else {
            if (commentid) {
                console.log('WEW')
                const reactionQuery = await postgres.query(
                    `INSERT INTO reactions (postid, commentid, reactiontype, username) VALUES ($1, $2, $3, $4) RETURNING *;`,
                    [postid, commentid, reactiontype, studentProfileQuery.rows[0].username],
                )
                return NextResponse.json(reactionQuery.rows[0])
            } else {
                console.log('IMBA')
                const reactionQuery = await postgres.query(
                    `INSERT INTO reactions (postid, reactiontype, username) VALUES ($1, $2, $3) RETURNING *;`,
                    [postid, reactiontype, studentProfileQuery.rows[0].username],
                )
                return NextResponse.json(reactionQuery.rows[0])
            }
        }
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: true, message: 'Something went wrong', log: JSON.stringify(e) })
    }
}

export async function DELETE(req: Request) {
    const jwt = headers().get('authorization')
    try {
        const { postid, commentid } = await req.json()
        const jwtQuery = await postgres.query(`SELECT * FROM jwt WHERE id = $1 LIMIT 1;`, [jwt])
        const studentProfileQuery = await postgres.query(
            `SELECT * FROM student_profiles WHERE student_id = $1 LIMIT 1;`,
            [jwtQuery.rows[0].student_id],
        )
        const reactionQuery = await postgres.query(
            `DELETE FROM reactions WHERE ${postid ? 'postid' : 'commentid'} = $1 AND username = $2 RETURNING *;`,
            [postid || commentid, studentProfileQuery.rows[0].username],
        )

        return NextResponse.json(reactionQuery.rows[0])
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: true, message: 'Something went wrong', log: JSON.stringify(e) })
    }
}
