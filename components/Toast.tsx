'use client'

import { useToast } from '@chakra-ui/react'
import { useCookies } from 'react-cookie'
import { cookeys } from 'lib/resources'
import { useEffect } from 'react'

export const Toast = () => {
    const [cookies, setCookie, removeCookie] = useCookies()
    const toast = useToast()

    useEffect(() => {
        const toastCookie = cookies[cookeys.TOAST]
        if (toastCookie?.description) {
            toast({
                title: toastCookie?.title,
                description: toastCookie?.description,
                status: toastCookie?.status,
                isClosable: true,
            })
            removeCookie(cookeys.TOAST)
        }
    }, [cookies, removeCookie])

    return <></>
}
