'use client'

import { Flex, Box, SimpleGrid, IconButton, Link, Button, Icon, Text, Heading, Center, Input, Select, GridItem, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, calc } from '@chakra-ui/react'
import { Announcements } from '../announcements'
import { PostItem } from '../post-item'
import { useHome, useUser } from 'lib/contexts'
import { FaUser } from 'react-icons/fa'
import { EditIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ClassSchedType, ClassType, SubjectType, User, UserContextType } from 'lib/types'
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaRegFolderOpen } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";


import { useCookies } from 'react-cookie'
import { colors } from '../client'

export function SubjectClient({ classes, classScheds, subjects }: { classes: ClassType[]; classScheds: ClassSchedType[]; subjects: SubjectType[] }) {
    const { user } = useUser()
    
    const [yearLevel, setYearLevel] = useState(user?.year_level || '')
    const [course, setCourse] = useState(user?.course || '')
    const [ cookies ] = useCookies()
    const { posts } = useHome()

    const class_id = useMemo(() => {
        return classes.find(item => item.year_level === yearLevel && item.course === course)?.class_id || ''
    }, [yearLevel, course]) 

    const enlistedSubjects = useMemo(() => {
        if(class_id) return classScheds
            .filter(item => item.class_id === class_id)
            .map(item => ({
                ...item,
                ...(subjects.find(_item => _item.subject_code === item.subject_code) || {})
            }))
        return []
    }, [class_id])

    return (
        <Flex as='article' className='app' w='full' gap='2rem' direction='column'>
            <Box flex={1}>
                <Heading mb='1rem'>{user?.username}&lsquo;s Subjects</Heading>
                <SimpleGrid columns={[2, 2, 3, 3, 3, 4]} gap='0.75rem'>
                    {enlistedSubjects.map((item, i) =>
                        <Flex key={i} direction='column' aspectRatio={[4/5, 1]} bg='white' rounded='md' overflow='hidden'>
                            <Box aspectRatio={19/9} w='full' bg={colors[i%colors.length] + '.300'}/>
                            <Flex flex={1} direction='column' p='0.5rem 1rem'>
                                <Text color={colors[i%colors.length] + '.500'} w='100%' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>{item.subject_name}</Text>
                                <Text color='green.500' fontWeight={500} mb='-0.25rem' w='100%' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>{item.subject_code}@{item.schedule}</Text>
                                <Text color='green.500' fontSize='sm' w='100%' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>{item.professor}</Text>
                                <Box flex={1} />
                                <Flex align='center' justify='end' color='gray.600' gap='1.5rem' fontSize='1.5rem' mt='0.5rem'>
                                    <IoChatbubblesOutline />
                                    <FaRegFolderOpen />
                                    <GrNotes />
                                </Flex>
                            </Flex>
                        </Flex>
                    )}
                </SimpleGrid>
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
            {!enlistedSubjects.length && (
                <Text>
                    It seems like you&lsquo;re not enrolled to any course yet,{' '}
                    <Link as={NextLink} href='/app/registration' color='green.500' fontWeight={500}>
                        register
                    </Link>{' '}now.
                </Text>
            )}
        </Flex>
    )
}
