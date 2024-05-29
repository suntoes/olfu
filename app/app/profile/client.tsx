'use client'

import { Flex, Box, SimpleGrid, IconButton, Link, Button, Icon, Text, Heading, Center, Input, Select, GridItem } from '@chakra-ui/react'
import { Announcements } from '../announcements'
import { PostItem } from '../post-item'
import { useHome, useUser } from 'lib/contexts'
import { FaUser } from 'react-icons/fa'
import { EditIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { profileAction } from './action'
import { useEffect } from 'react'
import { User, UserContextType } from 'lib/types'
import { useCookies } from 'react-cookie'

export function ProfileClient({ user: userProp }: { user: User }) {
    const { setUser } = useUser()
    const { posts } = useHome()

    useEffect(() => {
        setUser(userProp)
    }, [userProp])

    return (
        <Flex as='article' className='app' w='full' gap='2rem'>
            <Box flex={1}>
                <Heading>{userProp?.username}&lsquo;s Profile</Heading>
                <Flex gap='2rem' my='0.75rem' justify='center' direction={{ base: 'column', md: 'row' }}>
                    <Flex direction={{ base: 'row', md: 'column' }} gap='1rem' align='center'>
                        <Center aspectRatio={1} rounded='full' bg='gray.200' fontSize='8rem' overflow='hidden'>
                            <FaUser style={{ transform: 'translateY(1rem)' }}/>
                        </Center>
                        <Button bg='white'>Upload Image</Button>
                    </Flex>
                    <Flex as='form' action={profileAction} flex={1} direction='column' gap='0.75rem'>
                        <Box>
                            <Text mb='0.125rem'>Full Name</Text>
                            <SimpleGrid columns={3} gap='0.5rem'>
                                <Input name='first_name' defaultValue={userProp?.first_name || ''} bg='white' placeholder='First Name' required/>
                                <Input name='middle_name' defaultValue={userProp?.middle_name || ''} bg='white' placeholder='Middle Name' required/>
                                <Input name='last_name' defaultValue={userProp?.last_name || ''} bg='white' placeholder='Last Name' required/>
                            </SimpleGrid>
                        </Box>
                        <Flex gap='0.75rem 0.5rem' flexWrap='wrap'>
                            <Box flex={1} maxW='11rem'>
                                <Text mb='0.125rem'>Date of Birth</Text>
                                <Input name='date_of_birth' bg='white' defaultValue={userProp?.date_of_birth ? [new Date(userProp?.date_of_birth).getFullYear(), (new Date(userProp?.date_of_birth).getMonth() + 1).toString().padStart(2, '0'), new Date(userProp?.date_of_birth).getDate().toString().padStart(2, '0')].join('-') : ''} type='date' placeholder='--' />
                            </Box>
                            <Box flex={1} minW='8rem' maxW='12rem'>
                                <Text mb='0.125rem'>Student ID</Text>
                                <Input bg='white' value={userProp?.student_id || ''} placeholder='Student Number' readOnly isDisabled/>
                            </Box>
                            <Box flex={1} minW='15rem'>
                                <Text mb='0.125rem'>Student Username</Text>
                                <Input bg='white' value={userProp?.username || ''} placeholder='Username' readOnly required isDisabled/>
                            </Box>
                        </Flex>
                        <Flex gap='0.75rem 0.5rem' flexWrap='wrap'>
                            <Box flex={1}>
                                <Text mb='0.125rem'>Contact No.</Text>
                                <Input name='contact_no' bg='white' defaultValue={userProp?.contact_no || ''} placeholder='+63 (XXX) XXX-XXXX' required/>
                            </Box>
                            <Box flex={1}>
                                <Text mb='0.125rem'>Nationality</Text>
                                <Input name='nationality' bg='white' defaultValue={userProp?.nationality || ''} placeholder='---' required/>
                            </Box>
                            <Box flex={1}>
                                <Text mb='0.125rem'>Marital Status</Text>
                                <Select name='marital_status' bg='white' required defaultValue={userProp?.marital_status || ''}>
                                    <option value='Single'>Single</option>
                                    <option value='Married'>Married</option>
                                    <option value='Widowed'>Widowed</option>
                                    <option value='Divorced'>Divorced</option>
                                    <option value='Separated'>Separated</option>
                                    <option value='Other'>Other</option>
                                </Select>
                            </Box>
                        </Flex>
                        <Flex gap='0.75rem 0.5rem' flexWrap='wrap'>
                            <Box flex={1}>
                                <Text mb='0.125rem'>Gender</Text>
                                <Select name='gender' bg='white' required defaultValue={userProp?.gender || ''}>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                </Select>
                            </Box>
                            <Box minW='7rem' flex={1}>
                                <Text mb='0.125rem'>Year  Level</Text>
                                <Input bg='white' value={userProp?.year_level || ''} placeholder='---' readOnly isDisabled/>
                            </Box>
                            <Box minW='25rem' flex={1}>
                                <Text mb='0.125rem'>Course Enrolled</Text>
                                <Input bg='white' value={userProp?.course || ''} placeholder='Not enrolled yet' readOnly isDisabled/>
                            </Box>
                        </Flex>
                        <Box>
                            <Text mb='0.125rem'>Full Address</Text>
                            <Flex gap='0.75rem 0.5rem' flexWrap='wrap'>
                                <Input name='street' minW='5rem' flex={1} bg='white' defaultValue={userProp?.street || ''} placeholder='Street' required/>
                                <Input name='brgy' minW='6rem' flex={1} bg='white' defaultValue={userProp?.brgy || ''} placeholder='Barangay' required/>
                                <Input name='city' minW='7rem' flex={1} bg='white' defaultValue={userProp?.city || ''} placeholder='City' required/>
                                <Input name='country' minW='8rem' flex={1} bg='white' defaultValue={userProp?.country || ''} placeholder='Country' required/>
                                <Input name='zipcode' minW='4rem' flex={1} bg='white' defaultValue={userProp?.zipcode || ''} placeholder='Zipcode' required/>
                            </Flex>
                        </Box>
                        <Button type='submit' colorScheme='green' mt='1rem'>Save {userProp?.username}&lsquo;s Profile</Button>
                    </Flex>
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
