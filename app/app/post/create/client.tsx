'use client'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { CommentType, PostType, ReactionType } from 'lib/types'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, IconButton, Input, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { FaTrash, FaUser } from 'react-icons/fa'
import { GrChat, GrDislike, GrLike } from 'react-icons/gr'
import { EditIcon } from '@chakra-ui/icons'
import { Tiptap } from '../[postid]/tiptap'
import { useRouter, useSearchParams } from 'next/navigation'
import { useHome, useUser } from 'lib/contexts'
import NextLink from 'next/link'
import { PostItem } from 'app/app/post-item'

export const Create = () => {

    const { posts, reactions, comments, handlePost, handleReact, handleComment } = useHome()
    const [content, setContent] = useState(`<h1>What's on your mind?</h1>`)
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('Untitled')
    const searchParams = useSearchParams()
    const { user } = useUser()
    const router = useRouter()

    const postReactions = []
    const postLikes: ReactionType[] = []
    const postDislikes: ReactionType[] = []
    const postComments: CommentType[] = []
    const postMinuteRead = useMemo(() => {
        const text = title + content + user?.username
        const wordsPerMinute = 200 // Average reading speed
        const words = text.split(/\s+/).length // Split by spaces and count words
        const minutes = words / wordsPerMinute // Calculate minutes and round up

        return minutes
    }, [title, content, user])

    const handleCreate = useCallback(async() => {
        if(loading) return
        setLoading(true)
        const res = await handlePost(null, title, content)
        if(res) router.replace('/app/post/' + res.postid, { scroll: false })
        else setLoading(false)
    }, [handlePost, loading, title, content])

    return (
        <Box className='editor'>
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
                    <Text color='black'>{user?.username}</Text>
                    <Text display='flex' alignItems='center' gap='0 0.75rem' flexWrap='wrap'>
                        Published in OLFU<span>·</span>
                        {postMinuteRead < 1 ? `< 1` : Math.floor(postMinuteRead)} min read<span>·</span>
                        {new Date().toLocaleDateString()}
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
                        variant='ghost'
                        display='flex'
                        alignItems='center'
                        gap='0.25rem'
                    >
                        <GrChat />
                        {postComments.length}
                    </Button>
                </Tooltip>
                <Button as={NextLink} href='/app' colorScheme='gray' bg='gray.300' isDisabled={loading}>
                    Cancel
                </Button>
                <Button onClick={handleCreate} colorScheme='green' isDisabled={loading}>
                    Create Post
                </Button>
            </Flex>
            <Divider borderColor='gray.300' mb='2.5rem'/>
            <Tiptap content={content} onChange={(val) => setContent(val)} />
            <Box pt='2rem'/>
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
    )
}