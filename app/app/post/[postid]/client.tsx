'use client'

import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Text,
    Tooltip,
    useDisclosure,
    Input,
} from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useHome, useUser } from 'lib/contexts'
import { PostType } from 'lib/types'
import { FaUser, FaTrash } from 'react-icons/fa'
import { EditIcon } from '@chakra-ui/icons'
import { GrChat, GrDislike, GrLike } from 'react-icons/gr'
import { useCallback, useEffect, useRef, useState } from 'react'
import { addUTCOffset, timeAgo } from 'lib/utils'
import { PostItem } from 'app/app/post-item'
import { Editor } from './editor'
import NextLink from 'next/link'
import './content.scss'

export const Post = ({ postid }: { postid: string }) => {
    const { isOpen: isCommentOpen, onOpen: onCommentOpen, onClose: onCommentClose } = useDisclosure()
    const { posts, reactions, comments, handleReact, handleComment } = useHome()
    const searchParams = useSearchParams()
    const [edit, setEdit] = useState(false)
    const { user } = useUser()
    const router = useRouter()

    const commentBtnRef = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
        if (searchParams.get('comment') === '1') {
            router.replace('/app/post/' + postid, { scroll: false })
            onCommentOpen()
        }
    }, [searchParams])

    const handleCommentSubmit = useCallback(
        (e: any & React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            handleComment(postid, (e.target as any)?.comment.value)
            e.target.reset()
        },
        [handleComment],
    )

    const post: PostType | undefined = posts.find((item) => item.postid.toString() === postid)
    if (!post) {
        router.replace('/app')
        return <></>
    }

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
        <>
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
            <Box w='full'>
                {edit ? (
                    <Editor post={post} onCancel={() => setEdit(false)} />   
                ) : <>
                        <Heading fontSize='3.5rem' maxW='80%'>
                            {post.title}
                        </Heading>
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
                            {post.username === user?.username && (
                                <Button onClick={() => setEdit(true)} colorScheme='yellow'>
                                    <EditIcon mr='0.5rem' /> Edit
                                </Button>
                            )}
                        </Flex>
                        <Divider borderColor='gray.300' />
                        <Box my='2.5rem' className='content' dangerouslySetInnerHTML={{ __html: post.content }} />
                </>}
                <Divider mb='2rem' borderColor='gray.300' />
                <Heading as={Flex} justify='space-between' display={{ base: 'flex', lg: 'none' }} my='1rem' w='full'>
                    Posts
                    <Button as={NextLink} href='/app/post/create' aria-label='Create post' fontSize='1rem' colorScheme='yellow'>
                        Write
                        <EditIcon ml='0.5rem'/>
                    </Button>
                </Heading>
                <Box
                    style={{
                        maskImage:
                            'linear-gradient(0deg, transparent, black 2rem, black calc(100% - 2rem), transparent)',
                    }}
                >
                    <Flex
                        display={{ base: 'flex', lg: 'none' }}
                        direction='column'
                        aspectRatio={{ base: 3 / 4, sm: 4 / 3, md: 16 / 9 }}
                        overflow='auto'
                        gap='0.75rem'
                        py='1.5rem'
                    >
                        {posts.map((item, i) => (
                            <PostItem key={i} post={item} />
                        ))}
                    </Flex>
                </Box>
            </Box>
        </>
    )
}
