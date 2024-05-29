'use client'

import { Flex, Box, SimpleGrid, IconButton, Link, Button, Icon, Text, Heading, Center, Input, Select, GridItem, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, calc } from '@chakra-ui/react'
import { Announcements } from '../announcements'
import { PostItem } from '../post-item'
import { useHome, useUser } from 'lib/contexts'
import { FaUser } from 'react-icons/fa'
import { EditIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { registerAction } from './action'
import { useEffect, useMemo, useState } from 'react'
import { ClassSchedType, ClassType, SubjectType, User, UserContextType } from 'lib/types'
import { useCookies } from 'react-cookie'

export function RegistrationClient({ classes, classScheds, subjects }: { classes: ClassType[]; classScheds: ClassSchedType[]; subjects: SubjectType[] }) {
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
        <Flex as='article' className='app' w='full' gap='2rem'>
            <Box flex={1}>
                <Heading>{user?.username}&lsquo;s Registration</Heading>
                <Flex gap='2rem' my='0.75rem' justify='center' direction={{ base: 'column' }}>
                    <Box pos='relative' h='8.75rem'>
                        <TableContainer pos='absolute' left={0} top={0} w='full' pb='0.5rem' overflow='auto' bg='gray.200' rounded='md'>
                            <Table size='sm'>
                                <Thead>
                                    <Tr>
                                        <Th borderColor='gray.200' w='5rem'></Th>
                                        <Th borderColor='gray.200'></Th>
                                        <Th borderColor='gray.200' w='5rem'></Th>
                                        <Th borderColor='gray.200'></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td borderColor='gray.200'>Name:</Td>
                                        <Td borderColor='gray.200' color='green.500' fontWeight={500}>{user?.last_name}, {user?.first_name} {user?.middle_name}</Td>
                                        <Td borderColor='gray.200'>Student #:</Td>
                                        <Td borderColor='gray.200' color='green.500' fontWeight={500}>{user?.student_id}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td borderColor='gray.200'>Program:</Td>
                                        <Td borderColor='gray.200'>{course || '---'}</Td>
                                        <Td borderColor='gray.200'>Year Level:</Td>
                                        <Td borderColor='gray.200'>{yearLevel || '---'}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td borderColor='gray.200'>Status:</Td>
                                        <Td borderColor='gray.200'>{`Continuing (24 Units Allowed)`}</Td>
                                        <Td borderColor='gray.200'>Section:</Td>
                                        <Td borderColor='gray.200' color='green.500' fontWeight={500}>YB-1</Td>
                                    </Tr>
                                    <Tr>
                                        <Td borderColor='gray.200'>SY:</Td>
                                        <Td borderColor='gray.200' color='green.500' fontWeight={500}>2023-2024</Td>
                                        <Td borderColor='gray.200'>Semester:</Td>
                                        <Td borderColor='gray.200' color='green.500' fontWeight={500}>Second Semester</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Flex as='form' action={registerAction} align='end' gap='0.5rem' wrap='wrap'>
                        <SimpleGrid columns={3} flex={1} gap='0.5rem'>
                            <Box>
                                <Text mb='0.125rem'>Year  Level</Text>
                                <Select name='year_level' bg='white' value={yearLevel} onChange={e => setYearLevel(e.target.value)}>
                                    <option selected disabled value=''>Pick a year</option>
                                    {Array.from(new Set(classes.map(item => item.year_level))).map((item, i) =>
                                        <option key={i} value={item}>{item}</option>
                                    )}
                                </Select>
                            </Box>
                            <GridItem colSpan={2}>
                                <Text mb='0.125rem'>Course</Text>
                                <Select name='course' bg='white' value={course} onChange={e => setCourse(e.target.value)}>
                                    <option selected disabled value=''>Select a course</option>
                                    {Array.from(new Set(classes.map(item => item.course))).map((item, i) =>
                                        <option key={i} value={item}>{item}</option>
                                    )}
                                </Select>
                            </GridItem>
                        </SimpleGrid>
                        <Button w={{ base: 'full', md: 'unset' }} type='submit' colorScheme='yellow'>Enroll</Button>
                    </Flex>
                    <Box>
                        <Text mb='0.25rem'>Enlisted Subjects in Selected Year and Course</Text>
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
                    </Box>
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
