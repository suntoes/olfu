'use client'

import { SystemProvider, UserProvider } from 'lib/contexts'
import { Loading, Toast } from 'components'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { OlfuProviderProps } from 'lib/types'

const theme = extendTheme({
    fonts: {
        body: 'var(--font-montserrat)',
    },
})

export const OlfuProvider = ({ children, userValue }: OlfuProviderProps) => {
    return (
        <ChakraProvider theme={theme}>
            <UserProvider value={userValue}>
                <SystemProvider>
                    <Toast />
                    <Loading />
                    {children}
                </SystemProvider>
            </UserProvider>
        </ChakraProvider>
    )
}
