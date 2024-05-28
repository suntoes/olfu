'use client'

import {
    Box,
    Button,
    Center,
    Checkbox,
    Container,
    Heading,
    Image,
    Input,
    InputGroup,
    InputLeftAddon,
    Link,
    useBreakpointValue,
} from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { portalAction } from './action'
import { FaUser } from 'react-icons/fa'
import { getGreeting } from 'lib/utils'

export default function PortalClient() {
    const [portal, setPortal] = useState<'login' | 'join' | 'admin' | 'forgot'>('login')
    const verticalAnim = useBreakpointValue({ base: true, md: false })
    const [switchCount, setSwitchCount] = useState(0)
    const [cookies] = useCookies()
    const router = useRouter()
    const onOtherSide = useMemo(() => {
        return !!(switchCount % 2)
    }, [switchCount])

    const handleSwitch = useCallback(
        (value: typeof portal) => {
            setSwitchCount(switchCount + 1)
            setPortal(value)
        },
        [switchCount],
    )

    useEffect(() => {
        if (cookies.jwt) router.replace('/student')
    }, [cookies])

    return (
        <Center h='full' p='2.5rem'>
            <Container
                pos='relative'
                minH='50rem'
                w='full'
                maxW='69rem'
                bg='white'
                rounded='5rem'
                p='2.5rem'
                overflow='hidden'
                shadow='xl'
            >
                <Center
                    as={motion.div}
                    initial={false}
                    bgGradient='linear(-45deg, gray.50, gray.200)'
                    pos='absolute'
                    overflow='hidden'
                    rounded='5rem'
                    zIndex={1}
                    w='full'
                    maxW={verticalAnim ? '100%' : '50%'}
                    p='2.5rem'
                    animate={
                        verticalAnim
                            ? { top: onOtherSide ? 'calc(100% - 10rem)' : '0%', left: 0 }
                            : { left: onOtherSide ? '0%' : '50%', top: 0 }
                    }
                    h={verticalAnim ? '10rem' : 'full'}
                >
                    <AnimatePresence mode='popLayout' initial={false}>
                        <Center
                            as={motion.div}
                            key={'key-' + portal + '-' + switchCount}
                            gap='1.5rem'
                            initial={{ [verticalAnim ? 'translateY' : 'translateX']: onOtherSide ? '-200%' : '200%' }}
                            exit={{ [verticalAnim ? 'translateY' : 'translateX']: onOtherSide ? '-200%' : '200%' }}
                            animate={{ [verticalAnim ? 'translateY' : 'translateX']: '0%' }}
                            flexDir={verticalAnim ? 'row' : 'column'}
                        >
                            <Image
                                alt='OLFU'
                                src='/assets/logo.png'
                                aspectRatio={1}
                                w='full'
                                maxW={verticalAnim ? '7rem' : '15rem'}
                            />
                            <Center gap={verticalAnim ? '0rem' : '1.5rem'} flexDir='column'>
                                <Heading color='green.600'>{getGreeting()}!</Heading>
                                <Link
                                    as='button'
                                    onClick={() => handleSwitch(portal === 'login' ? 'join' : 'login')}
                                    type='button'
                                    fontSize='1rem'
                                    color='green.600'
                                    transform={verticalAnim ? undefined : 'translateY(1rem)'}
                                >
                                    {portal === 'login' ? `Don't have an account?` : `Already have an account?`}
                                </Link>
                                {!verticalAnim && (
                                    <Button
                                        onClick={() => handleSwitch(portal === 'login' ? 'join' : 'login')}
                                        variant='outline'
                                        type='button'
                                        colorScheme='green'
                                        w='full'
                                        maxW='11rem'
                                        py='1.5rem'
                                    >
                                        {portal === 'join' ? 'SIGN IN' : 'SIGN UP'}
                                    </Button>
                                )}
                            </Center>
                        </Center>
                    </AnimatePresence>
                </Center>
                <Center
                    as={motion.div}
                    initial={false}
                    pos='absolute'
                    h={verticalAnim ? 'calc(100% - 10rem)' : 'full'}
                    w='full'
                    maxW={verticalAnim ? '100%' : '50%'}
                    p='2.5rem'
                    animate={
                        verticalAnim
                            ? { top: onOtherSide ? '0rem' : '10rem', left: 0 }
                            : { left: onOtherSide ? '50%' : '0%', top: 0 }
                    }
                >
                    <Box as={motion.div} w='full'>
                        <Center as='form' action={portalAction} flexDirection='column' gap='2rem'>
                            <Heading>
                                {portal === 'join' ? 'Sign Up' : portal === 'forgot' ? 'Forgot Pass' : 'Sign In'}
                            </Heading>
                            <InputGroup variant='filled' maxW='25rem'>
                                <InputLeftAddon bg='gray.300' px='1rem' py='1.5rem'>
                                    <EmailIcon fontSize='1.5rem' />
                                </InputLeftAddon>
                                <Input placeholder='Email' type='email' name='email' px='1rem' py='1.5rem' required />
                            </InputGroup>
                            {portal === 'join' && (
                                <InputGroup variant='filled' maxW='25rem'>
                                    <InputLeftAddon bg='gray.300' px='1rem' py='1.5rem'>
                                        <FaUser fontSize='1.5rem' />
                                    </InputLeftAddon>
                                    <Input
                                        placeholder='Username'
                                        type='text'
                                        name='username'
                                        px='1rem'
                                        py='1.5rem'
                                        required
                                    />
                                </InputGroup>
                            )}
                            {portal !== 'forgot' && (
                                <InputGroup variant='filled' maxW='25rem'>
                                    <InputLeftAddon bg='gray.300' px='1rem' py='1.5rem'>
                                        <LockIcon fontSize='1.5rem' />
                                    </InputLeftAddon>
                                    <Input
                                        placeholder='Password'
                                        name='password'
                                        type='password'
                                        px='1rem'
                                        py='1.5rem'
                                        required
                                    />
                                </InputGroup>
                            )}
                            {portal === 'join' && (
                                <InputGroup variant='filled' maxW='25rem'>
                                    <InputLeftAddon bg='gray.300' px='1rem' py='1.5rem'>
                                        <LockIcon fontSize='1.5rem' />
                                    </InputLeftAddon>
                                    <Input
                                        placeholder='Confirm Password'
                                        name='confirm-password'
                                        type='password'
                                        px='1rem'
                                        py='1.5rem'
                                        required
                                    />
                                </InputGroup>
                            )}
                            <input type='hidden' name='portal' value={portal} />
                            {portal === 'join' ? (
                                <Checkbox colorScheme='green' required>
                                    I accept the terms and conditions
                                </Checkbox>
                            ) : (
                                portal !== 'forgot' && (
                                    <Link
                                        as='button'
                                        onClick={() => handleSwitch('forgot')}
                                        type='button'
                                        fontSize='1rem'
                                        color='gray.400'
                                        transform='translateY(1rem)'
                                    >
                                        Forgot Your Password?
                                    </Link>
                                )
                            )}
                            <Button
                                type='submit'
                                colorScheme='green'
                                w='full'
                                maxW='11rem'
                                py='1.5rem'
                                disabled={portal === 'forgot'}
                            >
                                {portal === 'join' ? 'SIGN UP' : portal === 'forgot' ? 'SUBMIT' : 'SIGN IN'}
                            </Button>
                        </Center>
                    </Box>
                </Center>
            </Container>
        </Center>
    )
}
