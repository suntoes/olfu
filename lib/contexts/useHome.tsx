'use client'

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react'
import {
    CommentType,
    HomeContextType,
    HomeContextValue,
    HomeProviderProps,
    UserContextType,
    UserContextValue,
    UserProviderProps,
} from 'lib/types'
import { authedAPI } from 'lib/utils'
import { useUser } from '.'

const HomeContext = createContext<HomeContextType>(null)

export const useHome = () => {
    const context = useContext(HomeContext)
    if (context) return context
    else throw new Error(`useUser cannot be used outside UserProvider's children`)
}

export const HomeProvider = ({ children, value: valueProp }: HomeProviderProps) => {
    const [reactions, setReactions] = useState(valueProp?.reactions || [])
    const [comments, setComments] = useState(valueProp?.comments || [])
    const [posts, setPosts] = useState(valueProp?.posts || [])
    const { user } = useUser()
    const id = useId()

    const commentsRef = useRef<CommentType[]>(comments)

    const handleComment: HomeContextValue['handleComment'] = useCallback(
        async (postid, commentcontent, commentid) => {
            if (commentcontent) {
                const tmpId = new Date().getTime().toString()
                const newComments = [
                    ...comments,
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
        [comments],
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
        reactions,
        setReactions,
        comments,
        setComments,
        handleComment,
        handleReact,
    }

    return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>
}
