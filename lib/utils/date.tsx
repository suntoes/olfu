export function getClientUTCOffset() {
    return new Date().getTimezoneOffset() // Returns the timezone offset in minutes
}

export function addUTCOffset(dateString: Date | string, utcOffset: number = getClientUTCOffset()) {
    const date = new Date(dateString)

    // Convert the utcOffset to milliseconds
    const offsetMilliseconds = utcOffset * -60000

    // Add the offset to the date
    const newDate = new Date(date.getTime() + offsetMilliseconds)

    return newDate
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
