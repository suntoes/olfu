'use client'

import { FaHouseUser, FaCalendarAlt } from 'react-icons/fa'
import { Flex, Box, SimpleGrid, IconButton, Link, Button, Icon, Text, Heading } from '@chakra-ui/react'
import { GiWhiteBook, GiAbacus } from 'react-icons/gi'
import { Announcements } from './announcements'
import { CiSettings } from 'react-icons/ci'
import { AiOutlineSchedule } from 'react-icons/ai'
import { MdForum, MdEditNote } from 'react-icons/md'
import { MdAccountBalance } from 'react-icons/md'
import { GoReport } from 'react-icons/go'
import { postgres } from 'app/db'
import { Slider } from 'components'
import Image from 'next/image'
import { PostItem } from './post-item'
import { HomeProvider, useHome } from 'lib/contexts'
import { CommentType, PostType, ReactionType } from 'lib/types'
import { EditIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

export const links = [
    { icon: FaHouseUser, name: 'Profile', href: '/app/profile' },
    { icon: AiOutlineSchedule, name: 'Schedule', href: '/app/schedule' },
    { icon: GiWhiteBook, name: 'Subjects', href: '/app/subjects' },
    { icon: MdEditNote, name: 'Registration', href: '/app/registration' },
    { icon: GiAbacus, name: 'Grades', href: '/app/grades' },
    { icon: FaCalendarAlt, name: 'Calendar', href: '/app/calendar', disabled: true },
    { icon: MdAccountBalance, name: 'Account', href: '/app/account', disabled: true },
    { icon: MdForum, name: 'Forum', href: '/app/forum', disabled: true },
    { icon: GoReport, name: 'Report', href: '/app/report', disabled: true },
    { icon: CiSettings, name: 'Settings', href: '/app/settings', disabled: true },
]

const colors = ['green', 'teal', 'blue', 'cyan', 'purple', 'pink', 'red', 'orange', 'yellow', 'black']

// export const metadata = {
//     title: 'Home - OLFU Student'
// }

export function AppClient() {
    const { posts } = useHome()

    return (
        <Flex as='article' className='app' w='full' gap='2rem'>
            <Box flex={1}>
                <Announcements />
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
                <SimpleGrid columns={[2, 2, 3, 4, 5]} gap='1rem'>
                    {links.map((item, i) => (
                        <Button
                            key={i}
                            as={Link}
                            bg='white'
                            display='flex'
                            shadow='sm'
                            flexDirection='column'
                            alignItems='center'
                            gap='1rem'
                            aspectRatio={1}
                            aria-label={item.name}
                            href={item.href}
                            w='full'
                            h='unset'
                            isDisabled={item.disabled}
                        >
                            <Button
                                as='div'
                                variant='outline'
                                bg={colors[i % colors.length] + '.100'}
                                rounded='2xl'
                                colorScheme={colors[i % colors.length]}
                                aspectRatio={1}
                                fontSize='4rem'
                                w='4.5rem'
                                h='unset'
                            >
                                <item.icon />
                            </Button>
                            <Text>{item.name}</Text>
                        </Button>
                    ))}
                </SimpleGrid>
            </Box>
        </Flex>
    )
}
