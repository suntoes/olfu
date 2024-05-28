'use client'

import { Box, Center, Heading } from '@chakra-ui/react'
import { Slider } from 'components'
import './AnnouncementsStyles.scss'
import Image from 'next/image'

export function Announcements() {
    return (
        <Box>
            <Heading>Announcements</Heading>
            <Center
                className='announcements'
                aspectRatio={{ base: 16 / 9, md: 21 / 9 }}
                fontSize={['0.4em', '0.6em', '0.9em', '0.8em', '1em']}
            >
                <Slider className='announcements__slider' startIndex={5} clickable>
                    {[
                        <Image
                            key={0}
                            className='announcements__slider__item'
                            alt=''
                            src='/assets/ann.jpg'
                            width={800}
                            height={400}
                        />,
                        <Image
                            key={1}
                            className='announcements__slider__item'
                            alt=''
                            src='/assets/ann_01.jpg'
                            width={800}
                            height={400}
                        />,
                        <Image
                            key={2}
                            className='announcements__slider__item'
                            alt=''
                            src='/assets/ann_02.jpg'
                            width={800}
                            height={400}
                        />,
                        <Image
                            key={3}
                            className='announcements__slider__item'
                            alt=''
                            src='/assets/ann_03.jpg'
                            width={800}
                            height={400}
                        />,
                        <Image
                            key={4}
                            className='announcements__slider__item'
                            alt=''
                            src='/assets/ann_04.jpg'
                            width={800}
                            height={400}
                        />,
                        <Image
                            key={5}
                            className='announcements__slider__item'
                            alt=''
                            src='/assets/ann_05.jpg'
                            width={800}
                            height={400}
                        />,
                        <Image
                            key={6}
                            className='announcements__slider__item'
                            alt=''
                            src='/assets/ann_06.jpg'
                            width={800}
                            height={400}
                        />,
                        <Image
                            key={7}
                            className='announcements__slider__item'
                            alt=''
                            src='/assets/ann_07.jpg'
                            width={800}
                            height={400}
                        />,
                        <Image
                            key={8}
                            className='announcements__slider__item'
                            alt=''
                            src='/assets/ann_08.jpg'
                            width={800}
                            height={400}
                        />,
                    ]}
                </Slider>
            </Center>
        </Box>
    )
}
