export const generateRandomItems = (caseItems: any, chance?: any) => {
    if (!Array.isArray(caseItems)) return []

    const randomImages = []
    const sortedItems = caseItems.slice().sort((a, b) => a.price - b.price)

    for (let i = 0; i < 56; i++) {
        let randomTicket = chance ? chance.random() * 100 : Math.random() * 100
        // for (let item of sortedItems) {
        //     randomTicket -= item.probability
        //     if (randomTicket <= 0) {
        //         randomImages.push(item)
        //         break
        //     }
        // }
        randomImages.push(sortedItems[Math.floor(Math.random() * sortedItems.length)])
    }

    return randomImages
}
