import { cookeys, errors } from 'lib/resources'
import { serverToast } from 'lib/actions'
import { ToastOptions } from '@chakra-ui/react'

export const dropdowns: ((value: boolean) => void)[] = []

const modifiedToast = (title: string, description: string, status?: ToastOptions['status']) => {
    try {
        serverToast(title, description, status)
    } catch (e) {}
}

export function createNotification(status: ToastOptions['status'], message: string, options?: ToastOptions): void {
    modifiedToast('', message, status)
}

export async function api(
    path: string,
    method: string,
    body: BodyInit | null,
    notification = false,
    headers: Record<string, string> = { 'Content-Type': 'application/json' },
) {
    try {
        let res = await fetch(
            (process.env.NEXT_PUBLIC_DEPLOYMENT === 'DEVELOPMENT'
                ? 'http://localhost:3000/api'
                : 'https://olfu.vercel.app/api') + path,
            {
                //mode: 'no-cors',
                method,
                headers,
                body,
            },
        )
        let data = await res.json()

        if (process.env.NEXT_PUBLIC_DEPLOYMENT === 'DEVELOPMENT') {
            console.log(`api: ${path}; `, data)
        }

        if (data.error && (notification || data.error === 'DISABLED')) {
            const currentErrors = data.details?.issues.length
                ? data.details?.issues.map((item: any) => (errors as any)[item?.message]).filter((_: any) => _)
                : [(errors as any)[data.error] || data.error || errors.DEFAULT]

            // currentErrors.forEach((item: string) => modifiedToast(item, { type: 'error' }))
        }

        return data
    } catch (e) {
        if (process.env.NEXT_PUBLIC_DEPLOYMENT === 'DEVELOPMENT')
            console.log('There was an error when trying to fetch ' + path, e)
        // modifiedToast(errors.DEFAULT, { type: 'error' })
        return null
    }
}

export async function authedAPI(
    path: string,
    method: string,
    body: BodyInit | null,
    notification = false,
    jwt: string = getJWT(),
) {
    return await api(path, method, body, notification, {
        Authorization: jwt,
        'Content-Type': 'application/json',
    })
}

export async function fetchUser(jwt?: string) {
    let user = await authedAPI('/user', 'GET', null, false, jwt)
    return user?.error ? null : user
}

export function addDropdown(setValue: (value: boolean) => void) {
    dropdowns.push(setValue)
}

export function closeDropdowns() {
    dropdowns.forEach((dropdown) => dropdown(false))
}

export function getJWT(): string {
    return (
        document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${cookeys.JWT}=`))
            ?.split('=')[1] || ''
    )
}

export function logout() {
    document.cookie = `${cookeys.JWT}= ; SameSite=Lax; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    window.location.reload()
}
