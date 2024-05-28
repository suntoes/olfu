'use server'

import { ToastOptions } from '@chakra-ui/react'
import { cookeys } from 'lib/resources'
import { cookies } from 'next/headers'

export async function serverToast(title: string, description: string, status?: ToastOptions['status']) {
    cookies().set(cookeys.TOAST, JSON.stringify({ title, description, status, date: new Date().getTime() }))
}
