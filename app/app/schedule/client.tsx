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
import { useCookies } from 'react-cookie'

export function ScheduleClient({ classes, classScheds, subjects }: { classes: ClassType[]; classScheds: ClassSchedType[]; subjects: SubjectType[] }) {
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
                <Heading>{user?.username}&lsquo;s Subjects</Heading>
                <Flex gap='2rem' my='0.75rem' justify='center' direction={{ base: 'column' }}>
                        <Box pos='relative' h={`calc(3rem + ${enlistedSubjects.length * 3.25}rem)`}>
                            <TableContainer pos='absolute' left={0} top={0} w='full' overflow='auto' bg='white' rounded='md'>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>Subject Code</Th>
                                            <Th>Description</Th>
                                            <Th>Professor</Th>
                                            <Th>Units</Th>
                                            <Th>Schedule</Th>
                                            <Th>Room</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {enlistedSubjects.map((item, i) =>
                                            <Tr key={i}>
                                                <Td>{item.subject_code}</Td>
                                                <Td>{item.subject_name}</Td>
                                                <Td>{item.professor}</Td>
                                                <Td isNumeric>3</Td>
                                                <Td>{item.schedule}</Td>
                                                <Td>{item.room}</Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                </Flex>
                <Heading as={Flex} justify='space-between' display={{ base: 'flex', lg: 'none' }} my='1rem' w='full'>
                    Posts
                    <IconButton as={NextLink} href='/app/post/create' aria-label='Create post' icon={<EditIcon />} fontSize='1rem' colorScheme='green'/>
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
