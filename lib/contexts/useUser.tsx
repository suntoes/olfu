'use client'

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { UserContextType, UserContextValue, UserProviderProps } from 'lib/types'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { cookeys } from 'lib/resources'
import { fetchUser } from 'lib/utils'

const UserContext = createContext<UserContextType>(null)

export const useUser = () => {
    const context = useContext(UserContext)
    if (context) return context
    else throw new Error(`useUser cannot be used outside UserProvider's children`)
}

export const UserProvider = ({ children, value: valueProp }: UserProviderProps) => {
    const [cookies, setCookie, removeCookie] = useCookies()
    const router = useRouter()

    const [user, setUser] = useState<UserContextValue['user']>(valueProp?.user || null)
    const isLoading = useRef<boolean>(false)

    const jwt = useMemo(() => {
        return cookies[cookeys.JWT]
    }, [cookies])

    useEffect(() => {
        if (isLoading.current) return

        // [ ] TODO: Integrate user data with socket
        if (jwt && !user) {
            const getMe = async () => {
                let user = await fetchUser()
                isLoading.current = false
                if (user) setUser(user)
                //else removeCookie('jwt')
            }

            isLoading.current = true
            getMe()
        } else if (!jwt) {
            setUser(null)
        }
    }, [jwt])

    const logoutUser = () => {
        removeCookie(cookeys.JWT)
        setUser(null)
        router.refresh()
    }

    const value = { user, setUser, logoutUser }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
