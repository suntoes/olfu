'use client'

import { Flex, Box, SimpleGrid, IconButton, Link, Button, Icon, Text, Heading, Center, Input, Select, GridItem, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, calc, Divider } from '@chakra-ui/react'
import { Announcements } from '../announcements'
import { PostItem } from '../post-item'
import { useHome, useUser } from 'lib/contexts'
import { FaUser } from 'react-icons/fa'
import { EditIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ClassSchedType, ClassType, SubjectType, User, UserContextType } from 'lib/types'
import { useCookies } from 'react-cookie'

export function ReportsClient() {
    const { posts, reports, handleReport } = useHome()
    const { user, setUser } = useUser()

    const handleSubmit = useCallback((e: any & React.FormEvent<HTMLDivElement>) => {
        e.preventDefault()
        const title = (e.target as any).title.value
        const description = (e.target as any).description.value
        if(title && description) {
            handleReport(null, title, description)
            e.target.reset()
        }
    }, [handleReport])

    return (
        <Flex as='article' className='app' w='full' gap='2rem'>
            <Box flex={1}>
                <Heading mb='1rem'>{user?.username}&lsquo;s Reports</Heading>
                <Divider mb='1rem'/>
                <form onSubmit={handleSubmit}>
                    <Flex gap='0.5rem' mb='0.5rem'><Input bg='white' name='title' placeholder='Report Title' required/><Button type='submit' colorScheme='yellow'>Submit</Button></Flex>
                    <Input bg='white' name='description' placeholder ='Report Content' required/>
                </form>
                <Divider my='1rem'/>
                <Flex direction='column' gap='1rem'>
                    {reports.map((item, i) => 
                        <Box key={i} bg='white' rounded='lg' p='1rem'>
                            <Heading size='lg' mb='0.5rem'>{item.title}</Heading>
                            <Box bg='gray.200' p='1rem 0.75rem' mb='0.5rem'>
                                <Text><b>{new Date(item.submission_date || '').toLocaleDateString()}</b></Text>
                                <Box>{item.description}</Box>
                            </Box>
                            <Text align='end' fontWeight={700} color={(item.report_type === 'dismissed' ? 'red' : item.report_type === 'done' ? 'green' : item.report_type === 'in progress' ? 'yellow' : 'black') + '.500'}>
                                {(item.report_type || 'SENT').toUpperCase()}
                            </Text>
                        </Box>
                    )}
                </Flex>
                <Heading as={Flex} justify='space-between' display={{ base: 'flex', lg: 'none' }} my='1rem' w='full'>
                    Posts
                    <Button as={NextLink} href='/app/post/create' aria-label='Create post' fontSize='1rem' colorScheme='yellow'>
                        Write
                        <EditIcon ml='0.5rem'/>
                    </Button>
                </Heading>
                <Box
                    mb='1rem'
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
        </Flex>
    )
}
