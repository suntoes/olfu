'use client'

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Center,
    Container,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    IconButton,
    Input,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaTiktok } from 'react-icons/fa'
import { EditIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useCallback, useRef } from 'react'
import { useCookies } from 'react-cookie'
import { getGreeting, logout } from 'lib/utils'
import { userAgent } from 'next/server'
import { useHome, useUser } from 'lib/contexts'
import { FaUser } from 'react-icons/fa'
import NextLink from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { PostItem } from './post-item'
import { revalidatePath } from 'next/cache'
import { IoMdExit } from "react-icons/io";
import { links } from './client'

export const LayoutClient = ({ children }: { children: React.ReactNode }) => {
    const { isOpen: isLogoutOpen, onOpen: onLogoutOpen, onClose: onLogoutClose } = useDisclosure()
    const { isOpen: isNavOpen, onOpen: onNavOpen, onClose: onNavClose } = useDisclosure()
    const [cookies, setCookie, removeCookie] = useCookies()
    const pathname = usePathname()
    const { posts } = useHome()
    const { user } = useUser()

    const cancelLogoutRef = useRef<HTMLButtonElement | null>(null)
    const navBtnRef = useRef<HTMLButtonElement | null>(null)

    const handleLogout = useCallback(() => {
        logout()
        revalidatePath('/')
        removeCookie('jwt')
    }, [onLogoutClose])

    return (
        <Flex minH='100vh' direction='column' bg='gray.100' w='100vw' pt='5rem' overflow='hidden'>
            <Drawer isOpen={isNavOpen} placement='left' onClose={onNavClose} finalFocusRef={navBtnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Link as={NextLink} href='/' width={75} height={75}>
                            <Image alt='OLFU' src='/assets/logo.png' width={75} height={75} />
                        </Link>
                        <Text mt='1rem'>
                            <b>
                                {getGreeting()}, {user?.username}!
                            </b>
                        </Text>
                    </DrawerHeader>

                    <DrawerBody>
                        <Flex direction='column'>
                            {links.map((item, i) =>
                                <Link key={i} fontSize='1.25rem' px='0.5rem' py='0.75rem' as={NextLink} display='flex' alignItems='center' gap='0.5rem' href={item.disabled ? '' : item.href} opacity={item.disabled ? 0.4 : 1}>
                                    <item.icon />
                                    {item.name}
                                </Link>
                            )}
                        </Flex>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button onClick={onLogoutOpen} fontSize='1.25rem' display='flex' gap='0.25rem' alignItems='center'>
                            <IoMdExit />
                            Logout
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <AlertDialog isOpen={isLogoutOpen} leastDestructiveRef={cancelLogoutRef} onClose={onLogoutClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Logout
                        </AlertDialogHeader>

                        <AlertDialogBody>Are you sure you want to logout?</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelLogoutRef} onClick={onLogoutClose}>
                                No
                            </Button>
                            <Button colorScheme='red' onClick={handleLogout} ml={3}>
                                Yes
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <Center
                as='nav'
                pos='fixed'
                w='100vw'
                top={0}
                left={0}
                bg='green.500'
                zIndex={99}
                backdropFilter='blur(10px)'
            >
                <Flex p='1rem' align='center' gap='1rem' w='full' maxW='100rem'>
                    <IconButton
                        aria-label='Open menu'
                        colorScheme='green'
                        fontSize='2rem'
                        ref={navBtnRef}
                        onClick={onNavOpen}
                        icon={<HamburgerIcon />}
                    />
                    <Link as={NextLink} href='/' display={{ base: 'none', md: 'block' }}>
                        <Image alt='' src='/assets/fatima-white.png' width={304} height={30} />
                    </Link>
                    <Link as={NextLink} href='/' display={{ base: 'block', md: 'none' }}>
                        <Image alt='' src='/assets/logo-white.png' width={50} height={50} />
                    </Link>
                    <Text ml='auto' color='white'>
                        {getGreeting()}, {user?.username}!
                    </Text>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Logout'
                            colorScheme='green'
                            fontSize='1.5rem'
                            rounded='full'
                            icon={<FaUser />}
                        />
                        <MenuList>
                            <MenuItem><Link as={NextLink} href='/app/profile'>Profile</Link></MenuItem>
                            <MenuItem onClick={onLogoutOpen}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Center>
            <Container w='full' maxW='90rem' p='2rem' m='auto'>
                <Flex
                    // direction={pathname.startsWith('/app/post') || pathname === '/app' ? 'row' : 'column'}
                    direction='row'
                    w='full'
                    gap='2rem'
                >
                    {children}
                    {/* {(pathname.startsWith('/app/post') || pathname === '/app') && ( */}
                    {true && (
                        <Box display={{ base: 'none', lg: 'block' }} w='30%' maxW='30rem' zIndex={1}>
                            <Heading as={Flex} justify='space-between' mb='1rem'>
                                Posts
                                <Button as={NextLink} href='/app/post/create' aria-label='Create post' fontSize='1rem' colorScheme='yellow'>
                                    Write
                                    <EditIcon ml='0.5rem'/>
                                </Button>
                            </Heading>
                            <Box h='50vh' maxH='70vh' overflow='auto'>
                                <Flex direction='column' gap='0.75rem'>
                                    {posts.map((item, i) => (
                                        <PostItem key={i} post={item} />
                                    ))}
                                </Flex>
                            </Box>
                        </Box>
                    )}
                </Flex>
            </Container>
            <Center bg='gray.200' p='4rem'>
                <Flex w='full' maxW='80rem' align='end'>
                    <Flex direction='column' gap='2rem'>
                        <Box opacity={0.4}>
                            <Image alt='OLFU' src='/assets/logo-black.png' width={75} height={75} />
                        </Box>
                        <Text>
                            <b>Location:</b> Valenzuela, Quezon City, Antipolo, Pampanga, Nueva Ecija, and Laguna
                            <br />
                            <b>Zoom Meeting ID (Main):</b> 949 7984 3076
                            <br />
                            <b>OLFU Helpdesk:</b>{' '}
                            <Link color='green.400' href='https://www.fatima.edu.ph/contact-us/'>
                                Click here
                            </Link>
                        </Text>
                    </Flex>
                    <Flex align='end' justify='end' gap='0.5rem' flexWrap='wrap' h='fit-content' ml='auto'>
                        {[
                            { icon: FaFacebook, href: `https://www.facebook.com/our.lady.of.fatima.university` },
                            { icon: FaInstagram, href: `https://www.instagram.com/fatimauniversity/` },
                            { icon: FaTiktok, href: `https://www.tiktok.com/@fatimauniversity1967` },
                            { icon: FaYoutube, href: `https://www.youtube.com/channel/UC1xRi6L2EBtkWvVdmkNHYEg` },
                            { icon: FaTwitter, href: `https://twitter.com/fatimaphoenix` },
                            { icon: FaLinkedin, href: `https://www.linkedin.com/school/our-lady-of-fatima-university` },
                        ].map((item, i) => (
                            <IconButton
                                key={i}
                                as={Link}
                                aria-label='Socmed link'
                                href={item.href}
                                colorScheme='green'
                                fontSize='1.5rem'
                                icon={<item.icon />}
                            />
                        ))}
                    </Flex>
                </Flex>
            </Center>
            <Center bg='gray.300' px='4rem' py='1rem'>
                <Flex w='full' maxW='80rem' gap='2rem' flexWrap='wrap'>
                    <Text>© {new Date().getFullYear()}. Our Lady of Fatima University. All rights reserved.</Text>
                    <Flex flexWrap='wrap' gap='0.5rem' ml='auto' flex={1} justify='space-between' maxW='20rem'>
                        {['Terms', 'Conditions', 'Privacy Policy'].map((item, i) => (
                            <Link key={i} href=''>
                                {item}
                            </Link>
                        ))}
                    </Flex>
                </Flex>
            </Center>
        </Flex>
    )
}
