'use client'

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react'
import {
    CommentType,
    HomeContextType,
    HomeContextValue,
    HomeProviderProps,
    PostType,
    ReportType,
    UserContextType,
    UserContextValue,
    UserProviderProps,
} from 'lib/types'
import { addUTCOffset, authedAPI } from 'lib/utils'
import { useUser } from '.'

const HomeContext = createContext<HomeContextType>(null)

export const useHome = () => {
    const context = useContext(HomeContext)
    if (context) return context
    else throw new Error(`useUser cannot be used outside UserProvider's children`)
}

export const HomeProvider = ({ children, value: valueProp }: HomeProviderProps) => {
    const [reactions, setReactions] = useState(valueProp?.reactions || [])
    const [initialComments, setComments] = useState(valueProp?.comments || [])
    const [initialReports, setReports] = useState(valueProp?.reports || [])
    const [initialPosts, setPosts] = useState(valueProp?.posts || [])
    const { user } = useUser()
    const id = useId()

    const comments: CommentType[] = useMemo(() => initialComments
        .map((item) => ({...item, timestamp: addUTCOffset(item.timestamp).toString()}))
        .sort((a, b) => (new Date(b.timestamp)).getTime() - (new Date(a.timestamp)).getTime())
    , [initialComments])

    const posts: PostType[] = useMemo(() => initialPosts
        .map((item) => ({...item, timestamp: addUTCOffset(item.timestamp).toString()}))
        .sort((a, b) => (new Date(b.timestamp)).getTime() - (new Date(a.timestamp)).getTime())
    , [initialPosts])

    const reports: ReportType[] = useMemo(() => initialReports
        .map((item) => ({...item, submission_date: addUTCOffset(item.submission_date).toString()}))
        .sort((a, b) => (new Date(b.submission_date)).getTime() - (new Date(a.submission_date)).getTime())
    , [initialReports])

    const commentsRef = useRef<CommentType[]>(initialComments)
    const reportsRef = useRef<ReportType[]>(initialReports)
    const postsRef = useRef<PostType[]>(initialPosts)
    
    const handleReport: HomeContextValue['handleReport'] = useCallback(
        async (id, title, description) => {
            if(!id && title && description) {
                const tmpId = new Date().getTime().toString()
                const newReports = [
                    ...initialReports,
                    { id: tmpId, report_type: 'sent' as 'sent', student_id: user?.student_id || '', title, description, submission_date: '' },
                ]
                reportsRef.current = newReports
                console.log(newReports)
                setReports(newReports)

                const res = await authedAPI('/report', 'POST', JSON.stringify({ title, description }))
                if (res?.error) {
                    const newReports = reportsRef.current.filter((item) => item.id !== tmpId)
                    reportsRef.current = newReports
                    setReports(newReports)
                } else {
                    const reportIndex = reportsRef.current.findIndex((item) => item.id === tmpId)
                    if (reportIndex === -1) {

                    } else {
                        const newReports = [
                            ...reportsRef.current.slice(0, reportIndex),
                            res,
                            ...reportsRef.current.slice(reportIndex + 1),
                        ]
                        reportsRef.current = newReports
                        setReports(newReports)
                    }
                }
            } else if (id &&!title && !description) {
                const targetReport = reportsRef.current.find((item) => item.id === id) as ReportType
                const oldReports = [...reportsRef.current]
                const newReports = reportsRef.current.filter((item) => item.id !== id)
                reportsRef.current = newReports
                setReports(newReports)

                const res = await authedAPI('/report', 'DELETE', JSON.stringify({ id }))
                if (res?.error) {
                    reportsRef.current = oldReports
                    setReports(oldReports)
                } else {

                }
            }
        },
        [initialReports, user]
    )
    
    const handlePost: HomeContextValue['handlePost'] = useCallback(
        async (postid, title, content) => {
            if(!postid && title && content) {
                const tmpId = new Date().getTime().toString()        
                const res = await authedAPI('/post', 'POST', JSON.stringify({ title, content }))
                if (res?.error) {

                } else {
                    const newPosts = [
                        res,
                        ...initialPosts,
                    ]
                    postsRef.current = newPosts
                    setPosts(newPosts)
                    return res
                }
            } else if (postid && title && content) {
                const targetPost = {...postsRef.current.find((item) => item.postid === postid), title, content} as PostType
                const oldPosts = [...postsRef.current]
                const newPosts = [targetPost, ...postsRef.current.filter((item) => item.postid !== postid)]
                postsRef.current = newPosts
                setPosts(newPosts)

                const res = await authedAPI('/post', 'PATCH', JSON.stringify({ postid, title, content }))
                if (res?.error) {
                    postsRef.current = oldPosts
                    setPosts(oldPosts)
                } else {

                }
            } else if (postid &&!title && !content) {
                const targetPost = postsRef.current.find((item) => item.postid === postid) as PostType
                const oldPosts = [...postsRef.current]
                const newPosts = postsRef.current.filter((item) => item.postid !== postid)
                postsRef.current = newPosts
                setPosts(newPosts)

                const res = await authedAPI('/post', 'DELETE', JSON.stringify({ postid }))
                if (res?.error) {
                    postsRef.current = oldPosts
                    setPosts(oldPosts)
                } else {

                }
            }
        },
        [initialPosts, user]
    )

    const handleComment: HomeContextValue['handleComment'] = useCallback(
        async (postid, commentcontent, commentid) => {
            if (commentcontent) {
                const tmpId = new Date().getTime().toString()
                const newComments = [
                    ...initialComments,
                    { commentid: tmpId, postid, username: user?.username || '', commentcontent, timestamp: '' },
                ]
                commentsRef.current = newComments
                setComments(newComments)

                const res = await authedAPI('/comment', 'POST', JSON.stringify({ postid, commentcontent }))
                if (res?.error) {
                    const newComments = commentsRef.current.filter((item) => item.commentid !== tmpId)
                    commentsRef.current = newComments
                    setComments(newComments)
                } else {
                    const commentIndex = commentsRef.current.findIndex((item) => item.commentid === tmpId)
                    if (commentIndex === -1) {
                        handleComment(res.postid, '')
                    } else {
                        const newComments = [
                            ...commentsRef.current.slice(0, commentIndex),
                            res,
                            ...commentsRef.current.slice(commentIndex + 1),
                        ]
                        commentsRef.current = newComments
                        setComments(newComments)
                    }
                }
            } else if (commentid) {
                const targetComment = commentsRef.current.find((item) => item.commentid === commentid)
                const newComments = commentsRef.current.filter((item) => item.commentid !== commentid)
                commentsRef.current = newComments
                setComments(newComments)

                if (targetComment) {
                    const res = await authedAPI('/comment', 'DELETE', JSON.stringify({ commentid }))
                    if (res?.error) {
                        const newComments = [targetComment, ...commentsRef.current]
                        commentsRef.current = newComments
                        setComments(newComments)
                    }
                }
            }
        },
        [user, initialComments],
    )

    const handleReact: HomeContextValue['handleReact'] = useCallback(
        (postid, commentid, reactiontype) => {
            console.log(postid, commentid, reactiontype)

            let reactIndex = -1
            if (commentid) {
                reactIndex = reactions.findIndex(
                    (item) => item.commentid === commentid && item.username === user?.username,
                )
            } else {
                reactIndex = reactions.findIndex(
                    (item) => item.postid === postid && !item.commentid && item.username === user?.username,
                )
            }

            if (reactIndex !== -1) {
                if (reactiontype) {
                    const tmp = [...reactions]
                    tmp[reactIndex] = { ...tmp[reactIndex], reactiontype }
                    setReactions(tmp)
                } else {
                    setReactions([...reactions.slice(0, reactIndex), ...reactions.slice(reactIndex + 1)])
                }
            } else if (!!reactiontype) {
                setReactions([
                    ...reactions,
                    {
                        reactionid: new Date().toString(),
                        postid: postid,
                        commentid: commentid || '',
                        reactiontype: reactiontype,
                        username: user?.username || '',
                        timestamp: new Date().toString(),
                    },
                ])
            } else return

            clearTimeout(parseInt(sessionStorage.getItem(id + 'react') || ''))
            const timeout = setTimeout(() => {
                switch (reactiontype) {
                    case 'like':
                        return authedAPI('/reaction', 'POST', JSON.stringify({ postid, commentid, reactiontype }))
                    case 'dislike':
                        return authedAPI('/reaction', 'POST', JSON.stringify({ postid, commentid, reactiontype }))
                    case undefined:
                        return authedAPI('/reaction', 'DELETE', JSON.stringify({ postid, commentid }))
                    default:
                        break
                }
            }, 1000)
            sessionStorage.setItem(id + 'react', timeout.toString())
        },
        [id, user, reactions],
    )

    const value = {
        posts,
        setPosts,
        reports,
        setReports,
        reactions,
        setReactions,
        comments,
        setComments,
        handleComment,
        handleReport,
        handleReact,
        handlePost
    }

    return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>
}
