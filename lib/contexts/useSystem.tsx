'use client'

import { SystemContextType, SystemContextValue, SystemProviderProps } from 'lib/types'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { errors, notifications } from 'lib/resources'
import { useCookies } from 'react-cookie'
import { useToast } from '@chakra-ui/react'

const SystemContext = createContext<SystemContextType>(null)

export const useSystem = () => {
    const context = useContext(SystemContext)
    if (context) return context
    else throw new Error(`useSystem cannot be used outside SystemProvider's children`)
}

export const SystemProvider = ({ children }: SystemProviderProps) => {
    const [cookies, setCookie, removeCookie] = useCookies()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const toast = useToast()

    const [maintenance, setMaintenance] = useState<SystemContextValue['maintenance']>(false)
    const [loading, setLoading] = useState<SystemContextValue['loading']>('website')
    const [cart, setCart] = useState<SystemContextValue['cart']>([])
    const [info, setInfo] = useState<SystemContextValue['info']>({
        connectedUsers: 0,
        roomSizes: {
            ['any']: 0,
            ['any1']: 0,
            ['any2']: 0,
        },
        bots: [] as any[],
    })

    const hasConnected = useRef<boolean>(false)

    useEffect(() => {
        if (pathname === '/maintenance') setMaintenance(true)
        else setMaintenance(false)
    }, [pathname])

    useEffect(() => {
        setLoading(null)
    }, [])

    useEffect(() => {
        const note = (notifications as any)?.[searchParams.get('note') || '']
        const err = (errors as any)?.[searchParams.get('err') || '']
        if (note) toast({ description: note, status: 'info' })
        if (err) toast({ description: err, status: 'error' })
    }, [searchParams])

    const value = {
        info,
        setInfo,
        cart,
        setCart,
        loading,
        setLoading,
        maintenance,
        setMaintenance,
    }

    return <SystemContext.Provider value={value}>{children}</SystemContext.Provider>
}
