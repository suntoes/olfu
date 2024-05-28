import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { PostType } from 'lib/types'
import React, { useCallback, useRef, useState } from 'react'
import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, IconButton, Input, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { FaTrash, FaUser } from 'react-icons/fa'
import { GrChat, GrDislike, GrLike } from 'react-icons/gr'
import { EditIcon } from '@chakra-ui/icons'
import { Tiptap } from './tiptap'
import { useRouter, useSearchParams } from 'next/navigation'
import { useHome, useUser } from 'lib/contexts'
import { timeAgo } from 'lib/utils'

export const Editor = ({ post, onCancel }: { post: PostType; onCancel: () => void }) => {

    const { isOpen: isCommentOpen, onOpen: onCommentOpen, onClose: onCommentClose } = useDisclosure()
    const { posts, reactions, comments, handlePost, handleReact, handleComment } = useHome()
    const [content, setContent] = useState(post.content)
    const [title, setTitle] = useState(post.title)
    const searchParams = useSearchParams()
    const { user } = useUser()
    const router = useRouter()

    const commentBtnRef = useRef<HTMLButtonElement | null>(null)

    const handleCommentSubmit = useCallback(
        (e: any & React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            handleComment(post.postid, (e.target as any)?.comment.value)
            e.target.reset()
        },
        [handleComment],
    )

    const postCommentReactions = reactions.filter((item) => item.postid === post?.postid && !!item.commentid)
    const postReactions = reactions.filter((item) => item.postid === post?.postid && !item.commentid)
    const postLikes = postReactions.filter((item) => item.reactiontype === 'like')
    const postDislikes = postReactions.filter((item) => item.reactiontype === 'dislike')
    const postComments = comments.filter((item) => item.postid === post?.postid)
    const postMinuteRead = (() => {
        const text = post.title + post.content + post.username
        const wordsPerMinute = 200 // Average reading speed
        const words = text.split(/\s+/).length // Split by spaces and count words
        const minutes = words / wordsPerMinute // Calculate minutes and round up

        return minutes
    })()

    return (
        <Box className='editor'>
            <Drawer isOpen={isCommentOpen} placement='right' onClose={onCommentClose} finalFocusRef={commentBtnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Text>Responses ({postComments.length})</Text>
                    </DrawerHeader>

                    <DrawerBody>
                        <form onSubmit={handleCommentSubmit}>
                            <Input name='comment' placeholder='What are your thoughts?' required />
                        </form>
                        <Divider my='2rem' />
                        {postComments
                            .map((item, i) => {
                                const commentReactions = postCommentReactions.filter(
                                    (_item) => _item.commentid === item.commentid,
                                )
                                const commentLikes = commentReactions.filter((_item) => _item.reactiontype === 'like')
                                const commentDislikes = commentReactions.filter(
                                    (_item) => _item.reactiontype === 'dislike',
                                )
                                return (
                                    <Box key={i}>
                                        <Flex mb='1rem' gap='0.5rem' align='center'>
                                            <IconButton
                                                aria-label=''
                                                icon={<FaUser fontSize='1.25rem' />}
                                                borderRadius='100%'
                                                bg='gray.300'
                                            />
                                            <Flex direction='column' justify='end' fontSize='0.75rem'>
                                                <Text color='black'>{item.username}</Text>
                                                <Text display='flex' alignItems='center' gap='0.75rem'>
                                                    {timeAgo(item.timestamp)}
                                                </Text>
                                            </Flex>
                                            {item.username === user?.username && (
                                                <IconButton
                                                    ml='auto'
                                                    onClick={() => handleComment(post.postid, null, item.commentid)}
                                                    aria-label='Delete'
                                                    icon={<FaTrash fontSize='1.25rem' />}
                                                    variant='ghost'
                                                    colorScheme='red'
                                                />
                                            )}
                                        </Flex>
                                        <Box mb='0.25rem'>{item.commentcontent}</Box>
                                        <Flex mb='0.75rem' gap='0.75rem' align='center'>
                                            <Tooltip
                                                hasArrow
                                                label={
                                                    commentLikes
                                                        .slice(0, 3)
                                                        .map((item) => item.username)
                                                        .join(', ') + (commentLikes.length > 3 ? '...' : '')
                                                }
                                            >
                                                <Button
                                                    onClick={() =>
                                                        handleReact(
                                                            post.postid,
                                                            item.commentid,
                                                            commentLikes.some(
                                                                (item) => item.username === user?.username,
                                                            )
                                                                ? undefined
                                                                : 'like',
                                                        )
                                                    }
                                                    variant='ghost'
                                                    display='flex'
                                                    alignItems='center'
                                                    gap='0.25rem'
                                                    textColor={
                                                        commentLikes.some((item) => item.username === user?.username)
                                                            ? 'green'
                                                            : 'gray.900'
                                                    }
                                                >
                                                    <GrLike />
                                                    {commentLikes.length}
                                                </Button>
                                            </Tooltip>
                                            <Tooltip
                                                hasArrow
                                                label={
                                                    commentDislikes
                                                        .slice(0, 3)
                                                        .map((item) => item.username)
                                                        .join(', ') + (commentLikes.length > 3 ? '...' : '')
                                                }
                                            >
                                                <Button
                                                    onClick={() =>
                                                        handleReact(
                                                            post.postid,
                                                            item.commentid,
                                                            commentDislikes.some(
                                                                (item) => item.username === user?.username,
                                                            )
                                                                ? undefined
                                                                : 'dislike',
                                                        )
                                                    }
                                                    variant='ghost'
                                                    display='flex'
                                                    alignItems='center'
                                                    gap='0.25rem'
                                                    textColor={
                                                        commentDislikes.some((item) => item.username === user?.username)
                                                            ? 'red'
                                                            : 'gray.900'
                                                    }
                                                >
                                                    <GrDislike />
                                                    {commentDislikes.length}
                                                </Button>
                                            </Tooltip>
                                        </Flex>
                                        <Divider mb='1.5rem' />
                                    </Box>
                                )
                            })}
                        {!postComments.length && <Text>It seems empty here... be the first to comment!</Text>}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Heading as={Input} value={title} onChange={(e: any) => setTitle(e.target.value)} m='0rem' p='0rem' h='3.5rem' fontSize='3.5rem' maxW='80%' />
            <Flex gap='0.5rem' align='center' my='2rem'>
                <IconButton
                    aria-label=''
                    icon={<FaUser fontSize='1.25rem' />}
                    borderRadius='100%'
                    w='3rem'
                    h='3rem'
                    bg='gray.300'
                />
                <Flex direction='column' justify='end'>
                    <Text color='black'>{post.username}</Text>
                    <Text display='flex' alignItems='center' gap='0 0.75rem' flexWrap='wrap'>
                        Published in OLFU<span>·</span>
                        {postMinuteRead < 1 ? `< 1` : Math.floor(postMinuteRead)} min read<span>·</span>
                        {new Date(post.timestamp).toLocaleDateString()}
                    </Text>
                </Flex>
            </Flex>
            <Divider borderColor='gray.300' />
            <Flex gap='0.75rem' align='center' my='0.5rem'>
                <Tooltip
                    hasArrow
                    label={
                        postLikes
                            .slice(0, 3)
                            .map((item) => item.username)
                            .join(', ') + (postLikes.length > 3 ? '...' : '')
                    }
                >
                    <Button
                        onClick={() =>
                            handleReact(
                                post.postid,
                                null,
                                postLikes.some((item) => item.username === user?.username) ? undefined : 'like',
                            )
                        }
                        variant='ghost'
                        display='flex'
                        alignItems='center'
                        gap='0.25rem'
                        textColor={
                            postLikes.some((item) => item.username === user?.username) ? 'green' : 'gray.900'
                        }
                    >
                        <GrLike />
                        {postLikes.length}
                    </Button>
                </Tooltip>
                <Tooltip
                    hasArrow
                    label={
                        postDislikes
                            .slice(0, 3)
                            .map((item) => item.username)
                            .join(', ') + (postLikes.length > 3 ? '...' : '')
                    }
                >
                    <Button
                        onClick={() =>
                            handleReact(
                                post.postid,
                                null,
                                postDislikes.some((item) => item.username === user?.username)
                                    ? undefined
                                    : 'dislike',
                            )
                        }
                        variant='ghost'
                        display='flex'
                        alignItems='center'
                        gap='0.25rem'
                        textColor={
                            postDislikes.some((item) => item.username === user?.username) ? 'red' : 'gray.900'
                        }
                    >
                        <GrDislike />
                        {postDislikes.length}
                    </Button>
                </Tooltip>
                <Tooltip
                    hasArrow
                    label={
                        Array.from(new Set(postComments.map((item) => item.username)))
                            .slice(0, 3)
                            .join(', ') +
                        (Array.from(new Set(postComments.map((item) => item.username))).length > 3 ? '...' : '')
                    }
                >
                    <Button
                        onClick={onCommentOpen}
                        variant='ghost'
                        display='flex'
                        alignItems='center'
                        gap='0.25rem'
                    >
                        <GrChat />
                        {postComments.length}
                    </Button>
                </Tooltip>
                <Button onClick={onCancel} colorScheme='gray' bg='gray.300'>
                    Cancel
                </Button>
                <Button onClick={() => { handlePost(post.postid, title, content); onCancel()}}  colorScheme='green'>
                    Save
                </Button>
                <Button onClick={() => handlePost(post.postid, null, null)} colorScheme='red' ml='auto'>
                    Delete
                </Button>
            </Flex>
            <Divider borderColor='gray.300' mb='2.5rem'/>
            <Tiptap content={content} onChange={(val) => setContent(val)} />
            <Box pt='2rem'/>
        </Box>
    )
}