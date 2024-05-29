export function getClientUTCOffset() {
    return new Date().getTimezoneOffset() // Returns the timezone offset in minutes
}

export function addUTCOffset(dateString: Date | string, utcOffset: number = getClientUTCOffset()) {
    const date = new Date(dateString || '')

    // Convert the utcOffset to milliseconds
    const offsetMilliseconds = utcOffset * -60000

    // Add the offset to the date
    const newDate = new Date(date.getTime() + offsetMilliseconds) as any

    return newDate === 'Invalid Date' ? new Date() : newDate
}

export function getGreeting() {
    const now = new Date()
    const hours = now.getHours()
    let greeting

    if (hours < 12) {
        greeting = 'Good Morning'
    } else if (hours < 18) {
        greeting = 'Good Afternoon'
    } else {
        greeting = 'Good Evening'
    }

    return greeting
}

export function timeAgo(date: string | Date) {
    const now = new Date()
    const past = addUTCOffset(date)
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

    const secondsInMinute = 60
    const secondsInHour = 60 * secondsInMinute
    const secondsInDay = 24 * secondsInHour
    const secondsInWeek = 7 * secondsInDay
    const secondsInMonth = 30 * secondsInDay // Approximation, assumes 30 days per month
    const secondsInYear = 365 * secondsInDay // Approximation, ignores leap years

    if (diffInSeconds < 1) {
        return `Just now`
    } else if (diffInSeconds < secondsInMinute) {
        return `${diffInSeconds} sec ago`
    } else if (diffInSeconds < secondsInHour) {
        const minutes = Math.floor(diffInSeconds / secondsInMinute)
        return `${minutes} min ago`
    } else if (diffInSeconds < secondsInDay) {
        const hours = Math.floor(diffInSeconds / secondsInHour)
        return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else if (diffInSeconds < secondsInWeek) {
        const days = Math.floor(diffInSeconds / secondsInDay)
        return `${days} day${days > 1 ? 's' : ''} ago`
    } else if (diffInSeconds < secondsInMonth) {
        const weeks = Math.floor(diffInSeconds / secondsInWeek)
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`
    } else if (diffInSeconds < secondsInYear) {
        const months = Math.floor(diffInSeconds / secondsInMonth)
        return `${months} month${months > 1 ? 's' : ''} ago`
    } else {
        const years = Math.floor(diffInSeconds / secondsInYear)
        return `${years} year${years > 1 ? 's' : ''} ago`
    }
}
