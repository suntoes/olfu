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
export interface ReportType {
    id: string
    report_type: 'sent' | 'in progress' | 'done' | 'dismissed'
    title: string
    description: string
    submission_date: string
}
export interface CommentType {
    commentid: string
    postid: string
    username: string
    commentcontent: string
    timestamp: string
}

export interface ClassType {
    class_id: string
    course: string
    year_level: string
}

export interface ClassSchedType {
    class_id: string
    subject_code: string
    schedule: string
    room: string
}

export interface SubjectType {
    subject_code: string
    subject_name: string
    professor: string
}

export interface HomeContextValue {
    posts: PostType[]
    setPosts: React.Dispatch<React.SetStateAction<HomeContextValue['posts']>>
    reports: ReportType[]
    setReports: React.Dispatch<React.SetStateAction<HomeContextValue['reports']>>
    reactions: ReactionType[]
    setReactions: React.Dispatch<React.SetStateAction<HomeContextValue['reactions']>>
    comments: CommentType[]
    setComments: React.Dispatch<React.SetStateAction<HomeContextValue['comments']>>
    handleReport: (id: string | null, title: string | null, content: string | null) => Promise<ReportType | void>
    handlePost: (postid: string | null, title: string | null, content: string | null) => Promise<PostType | void>
    handleComment: (postid: string, commentcontent: string | null, commentid?: string | null) => void
    handleReact: (postid: string, commentid: string | null, reactiontype?: 'like' | 'dislike') => void
}

export type HomeContextType = HomeContextValue | null

export interface HomeProviderProps {
    children: React.ReactNode
    value?: {
        posts: HomeContextValue['posts']
        reports: HomeContextValue['reports']
        reactions: HomeContextValue['reactions']
        comments: HomeContextValue['comments']
    }
}
