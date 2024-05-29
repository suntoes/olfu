import { CommentType, PostType, ReactionType, ReportType } from 'lib/types'
import { LayoutClient } from './layout-client'
import { HomeProvider } from 'lib/contexts'
import { postgres } from 'app/db'
import { cookies } from 'next/headers'

export default async function Layout({ children }: { children: React.ReactNode }) {
    const jwt = cookies().get('jwt') || { value: '' }
    const jwtQuery = await postgres.query(`SELECT * FROM jwt WHERE id = $1 LIMIT 1;`, [jwt.value])
    const postQuery: { rows: PostType[] } = await postgres.query(`SELECT * from posts`)
    const commentQuery: { rows: CommentType[] } = await postgres.query(`SELECT * from comments`)
    const reactionQuery: { rows: ReactionType[] } = await postgres.query(`SELECT * from reactions`)
    const reportsQuery: { rows: ReportType[] } = await postgres.query(`SELECT * from reports WHERE student_id = $1`, [(jwtQuery.rows[0] as any)?.student_id || ''])

    return (
        <HomeProvider value={{ posts: postQuery.rows, reactions: reactionQuery.rows, comments: commentQuery.rows, reports: reportsQuery.rows }}>
            <LayoutClient>{children}</LayoutClient>
        </HomeProvider>
    )
}
