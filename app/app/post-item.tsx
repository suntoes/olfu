'use client'

import { Box, Button, Flex, Heading, IconButton, Input, Tag, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { GrLike, GrDislike, GrChat } from 'react-icons/gr'
import { FaUser } from 'react-icons/fa'
import { useHome, useUser } from 'lib/contexts'
import { PostType } from 'lib/types'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useRef } from 'react'

export const PostItem = ({ post }: { post: PostType }) => {
    const { reactions, comments, handleReact } = useHome()
    const pathname = usePathname()
    const { user } = useUser()

    const postReactions = reactions.filter((item) => item.postid === post.postid && !item.commentid)
    const postComments = comments.filter((item) => item.postid === post.postid)
    const postDislikes = postReactions.filter((item) => item.reactiontype === 'dislike')
    const postLikes = postReactions.filter((item) => item.reactiontype === 'like')

    return (
        <Box bg='white' p='1rem' rounded='md' shadow='sm'>
            <Heading fontSize='1.2rem'>{post.title}</Heading>
            <Flex gap='0.5rem' align='center' mt='0.5rem'>
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
                        display='flex'
                        alignItems='center'
                        gap='0.25rem'
                        bg='gray.50'
                        textColor={postLikes.some((item) => item.username === user?.username) ? 'green' : 'gray.900'}
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
                            .join(', ') + (postDislikes.length > 3 ? '...' : '')
                    }
                >
                    <Button
                        onClick={() =>
                            handleReact(
                                post.postid,
                                null,
                                postDislikes.some((item) => item.username === user?.username) ? undefined : 'dislike',
                            )
                        }
                        display='flex'
                        alignItems='center'
                        gap='0.25rem'
                        bg='gray.50'
                        color={postDislikes.some((item) => item.username === user?.username) ? 'red' : 'gray.900'}
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
                        as={Link}
                        href={'/app/post/' + post.postid + '?comment=1'}
                        display='flex'
                        alignItems='center'
                        gap='0.25rem'
                        bg='gray.50'
                    >
                        <GrChat />
                        {postComments.length}
                    </Button>
                </Tooltip>
            </Flex>
            <Text p='1rem' bg='gray.50' my='1rem'>
                <b>{new Date(post.timestamp).toLocaleDateString()}</b>
                <br></br>
                {post.content.slice(0, 200)}
            </Text>
            <Flex gap='0.5rem' align='center'>
                <IconButton aria-label='' icon={<FaUser />} borderRadius='100%' />
                <Text>
                    <b>{post.username}</b>
                </Text>
                <Button
                    as={Link}
                    href={'/app/post/' + post.postid}
                    ml='auto'
                    isDisabled={pathname.endsWith('post/' + post.postid)}
                    colorScheme={post.username === user.username ? 'green' : 'gray'}
                >
                    View
                </Button>
            </Flex>
        </Box>
    )
}
