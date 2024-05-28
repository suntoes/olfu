'use client'

import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import { Box, Center, Image } from '@chakra-ui/react'
import { LoadingProps } from 'lib/types'
import { useSystem } from 'lib/contexts'
import './LoadingStyles.scss'

export const Loading = ({ className, ...props }: LoadingProps): JSX.Element => {
    const { loading } = useSystem()

    return (
        <AnimatePresence mode='wait' initial={false}>
            {loading === 'website' && (
                <Center
                    as={motion.div}
                    key={loading === 'website' ? 'website-loading' : ''}
                    className={['loading', className].join(' ')}
                    {...(props as any)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    bg='green.400'
                    flexDirection='column'
                    pos='fixed'
                    padding='2.5rem'
                    height='100vh'
                    width='100vw'
                    zIndex={999}
                    gap='3rem'
                    left={0}
                    top={0}
                >
                    <Image alt='' src='/assets/logo-white.png' w='full' maxW='15rem' />
                    <Box background='green.700' className='loading__progress'>
                        <div className='loading__progress__fill' />
                    </Box>
                    <Box color='white' className='loading__text'>
                        Connecting
                        <div className='loading__text__dot--00'></div>
                        <div className='loading__text__dot--01'></div>
                        <div className='loading__text__dot--02'></div>
                    </Box>
                </Center>
            )}
        </AnimatePresence>
    )
}
