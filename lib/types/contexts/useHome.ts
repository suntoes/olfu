export interface PostType {
    postid: string
    username: string
    title: string
    content: string
    timestamp: string
}
export interface ReactionType {
    reactionid: string
    postid: string
    commentid: string
    username: string
    reactiontype: 'like' | 'dislike' | null
    timestamp: string
}
export interface CommentType {
    commentid: string
    postid: string
    username: string
    commentcontent: string
    timestamp: string
}

export interface HomeContextValue {
    posts: PostType[]
    setPosts: React.Dispatch<React.SetStateAction<HomeContextValue['posts']>>
    reactions: ReactionType[]
    setReactions: React.Dispatch<React.SetStateAction<HomeContextValue['reactions']>>
    comments: CommentType[]
    setComments: React.Dispatch<React.SetStateAction<HomeContextValue['comments']>>
    handleComment: (postid: string, commentcontent: string | null, commentid: string | null) => void
    handleReact: (postid: string, commentid: string | null, reactiontype?: 'like' | 'dislike') => void
}

export type HomeContextType = HomeContextValue | null

export interface HomeProviderProps {
    children: React.ReactNode
    value?: {
        posts: HomeContextValue['posts']
        reactions: HomeContextValue['reactions']
        comments: HomeContextValue['comments']
    }
}
