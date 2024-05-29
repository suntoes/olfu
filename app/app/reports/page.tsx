import { ReportsClient } from './client'
import { postgres } from 'app/db'

export const metadata = {
    title: 'Reports - OLFU Student',
    description: `© 2024. Our Lady of Fatima University. All rights reserved.`,
}

export default async function Reports() {
    return <ReportsClient />
}
