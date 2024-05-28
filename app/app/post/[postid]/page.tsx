import { postgres } from 'app/db'
import { Post } from './client'

export async function generateMetadata({ params }: { params: { postid: string } }) {
    const postQuery = await postgres.query(`SELECT * from posts WHERE postid = $1 LIMIT 1;`, [params.postid])

    return {
        title: `${postQuery.rows[0].title} - OLFU Student`,
        description: postQuery.rows[0].content.slice(0, 50) + (postQuery.rows[0].content.length > 50 ? '...' : ''),
    }
}

export default async function Page({ params }: { params: { postid: string } }) {
    return (
        <>
            <Post postid={params.postid} />
        </>
    )
}
