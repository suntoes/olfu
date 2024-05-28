import { OlfuProvider } from 'lib/contexts'
import { cookeys, geogrotesque_wide } from 'lib/resources'
import { Montserrat } from 'next/font/google'
import { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import { fetchUser } from 'lib/utils'
import './RootLayoutStyles.scss'
import { Box, Center } from '@chakra-ui/react'

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
})

const baseUrl = 'https://fortbux-fe.vercel.app/' || (process.env.VERCEL_URL as string) || 'https://fortbux.com'

export const viewport: Viewport = {
    themeColor: '#424792',
}

export const metadata: Metadata = {
    icons: [
        {
            rel: 'icon',
            url: '/favicon-16x16.src',
        },
        {
            rel: 'icon',
            url: '/favicon-32x32.png',
        },
        {
            rel: 'apple-touch-icon',
            url: '/apple-touch-icon.png',
        },
    ],
    appleWebApp: {
        capable: true,
        title: 'Fortbux',
        statusBarStyle: 'black-translucent',
    },
    authors: {
        url: baseUrl,
        name: 'Fortbux',
    },
    twitter: {
        card: 'summary_large_image',
        site: '@Fortbux',
        creator: '@Fortbux',
        images: baseUrl + '/banner-01.png',
    },
    openGraph: {
        images: baseUrl + '/banner-01.png',
    },
    verification: {
        google: '1234567890',
    },
}

export default async function RootLayout({ children }: { children: React.ReactNode }): Promise<JSX.Element> {
    const jwt = cookies().get(cookeys.JWT)?.value

    const user = await (async () => {
        if (!jwt) return null
        const data = await fetchUser(jwt)
        return data
    })()

    return (
        <html lang='en' className={montserrat.variable}>
            <Center as='body' minH='100vh' flexDir='column' alignItems='stretch' w='full'>
                <OlfuProvider userValue={{ user }}>{children}</OlfuProvider>
            </Center>
        </html>
    )
}
