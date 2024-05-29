'use client'

import { Flex, Box, SimpleGrid, IconButton, Link, Button, Icon, Text, Heading, Center, Input, Select, GridItem, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, calc } from '@chakra-ui/react'
import { Announcements } from '../announcements'
import { PostItem } from '../post-item'
import { useHome, useUser } from 'lib/contexts'
import { FaUser } from 'react-icons/fa'
import { EditIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { Fragment, Suspense, useEffect, useMemo, useState } from 'react'
import { ClassSchedType, ClassType, SubjectType, User, UserContextType } from 'lib/types'
import { useCookies } from 'react-cookie'
import { colors } from '../client'

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

    const days = ['M', 'T', 'W', 'TH', 'F', 'S', 'SN']
    const times = ['7AM', '8AM', '9AM', '10AM', '11AM', '12NN', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM']

    return (
        <Flex as='article' className='app' w='full' gap='2rem' direction='column'>
            <Box flex={1}>
                <Heading mb='1rem'>{user?.username}&lsquo;s Schedule</Heading>
                <Box pos='relative' h={`calc(3rem + ${times.length * 4}rem)`}>
                    <Box pos='absolute' left={0} top={0} w='full' overflow='auto' bg='white' rounded='md'>
                        <TableContainer pos='relative'>
                            <Table pos='relative' size='sm' style={{borderCollapse:'collapse'}}>
                                <Box pos='absolute' w='calc(100% - 5rem)' h='calc(100% - 1.5rem)' left='5rem' top='1.5rem'>
                                    <Suspense fallback={<p>Loading Schedules...</p>}>
                                        <Box pos='relative' w='full' h='full'>
                                            {Array(7).fill('').map((_, i) =>
                                                <Box key={i} pos='absolute' left={(14.2857 * i) + '%'} h='100%' pr='0.075rem' bg='gray.200' zIndex={1}/>
                                            )}
                                            {enlistedSubjects.map((item, i) => {
                                                const sched = item.schedule.split(' / ')
                                                if(sched.length === 1) return {...item, color: colors[i%colors.length] + '.400'}
                                                else return sched.map(newSched => ({...item, color: colors[i%colors.length] + '.400', schedule: newSched}))
                                            }).flat(2).map((item, i) => {
                                                const day = item.schedule.split(' ')[0]
                                                const start = item.schedule.split(' ')[1].split('-')[0]
                                                const end = item.schedule.split(' ')[1].split('-')[1]
                                                const widthNum = 14.2857
                                                const leftMultiplier = days.indexOf(day) >= 0 ? days.indexOf(day) : -999

                                                return (
                                                    <Box 
                                                        h={(timeToPercent(end) - timeToPercent(start)) + '%'} 
                                                        left={(leftMultiplier * widthNum) + '%'} 
                                                        top={timeToPercent(start) + '%'} 
                                                        w={widthNum + '%'} 
                                                        textOverflow='ellipsis'
                                                        whiteSpace='nowrap'
                                                        fontSize='0.75rem'
                                                        overflow='hidden'
                                                        bg={item.color} 
                                                        pos='absolute' 
                                                        key={i} 
                                                    >
                                                        <Box w='full' h='full' pos='relative'>
                                                        <Box display={{ base: 'none', xl: 'block' }} p='0.25rem'>
                                                            <Text>{start}-{end}</Text>
                                                            <Text>{item.subject_code}</Text>
                                                            <Text>{item.room}</Text>
                                                        </Box>
                                                        <Box display={{ base: 'block', xl: 'none' }} pos='absolute' bottom='0.25rem' left='3.5rem' transform='rotate(-90deg)' transformOrigin='0% 100%'>
                                                            <Text>{start}-{end}</Text>
                                                            <Text>{item.subject_code}</Text>
                                                            <Text>{item.room}</Text>
                                                        </Box>
                                                        </Box>
                                                    </Box>
                                                )
                                            })}
                                        </Box>
                                    </Suspense>
                                </Box>
                                <Thead>
                                    <Tr>
                                        <Th h='1.5rem' w='5rem'></Th>
                                        <Th h='1.5rem'>Mon</Th>
                                        <Th h='1.5rem'>Tue</Th>
                                        <Th h='1.5rem'>Wed</Th>
                                        <Th h='1.5rem'>Thu</Th>
                                        <Th h='1.5rem'>Fri</Th>
                                        <Th h='1.5rem'>Sat</Th>
                                        <Th h='1.5rem'>Sun</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {times.map((item, i) => 
                                        <Fragment key={i}>
                                            <Tr>
                                                <Td>{item}</Td>
                                                <Td/><Td/><Td/><Td/><Td/><Td/><Td/>
                                            </Tr>
                                            <Tr>
                                                <Td color='white'>{item}</Td>
                                                <Td/><Td/><Td/><Td/><Td/><Td/><Td/>
                                            </Tr>
                                        </Fragment>
                                    )}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
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

function timeToPercent(time: string): number {
    // Parse the time string
    const hourMinute = time.slice(0, -3)
    const period = time.slice(-2)
    let [hour, minute] = hourMinute.split(':').map(Number);
    
    // Convert 12-hour format to 24-hour format
    if (period === 'PM' && hour !== 12) {
        hour += 12;
    } else if (period === 'AM' && hour === 12) {
        hour = 0;
    }

    // Calculate minutes since 7:00 AM
    const totalMinutesInDay = (hour * 60) + minute;
    const minutesSinceStart = totalMinutesInDay - (7 * 60); // 7:00 AM in minutes

    // Calculate the total range in minutes (from 7:00 AM to 8:00 PM)
    const totalRangeMinutes = (20 * 60) - (7 * 60); // 8:00 PM - 7:00 AM in minutes

    // Calculate the percentage
    const percentage = (minutesSinceStart / totalRangeMinutes) * 100;

    return percentage;
}