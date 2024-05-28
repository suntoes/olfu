import { CommentType, PostType, ReactionType } from 'lib/types'
import { LayoutClient } from './layout-client'
import { HomeProvider } from 'lib/contexts'
import { postgres } from 'app/db'

export default async function Layout({ children }: { children: React.ReactNode }) {
    const postQuery: { rows: PostType[] } = await postgres.query(`SELECT * from posts`)
    const reactionQuery: { rows: ReactionType[] } = await postgres.query(`SELECT * from reactions`)
    const commentQuery: { rows: CommentType[] } = await postgres.query(`SELECT * from comments`)

    return (
        <HomeProvider value={{ posts: postQuery.rows, reactions: reactionQuery.rows, comments: commentQuery.rows }}>
            <LayoutClient>{children}</LayoutClient>
        </HomeProvider>
    )
}
