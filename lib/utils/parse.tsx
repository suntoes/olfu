export function parseTab(tab?: string | null): { query: string; [key: string]: any } {
    try {
        return JSON.parse(tab || '')
    } catch {
        return { query: tab || '' }
    }
}

export function collectErrNames(data: any) {
    const issues = data?.details?.issues || []
    return issues.map((issue: any) => issue?.path).flat(2)
}

export function createSearchRegex(string: string) {
    return new RegExp(string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') // $& means the whole matched string
}
