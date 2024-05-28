'use client'

import { useEffect, useState } from 'react'

export function useInMiddle(elementRef: React.MutableRefObject<HTMLElement | null>) {
    const [inMiddle, setInMiddle] = useState(false)

    useEffect(() => {
        window.removeEventListener('scroll', handleScroll)

        function handleScroll() {
            if (!elementRef.current) return

            const rect = elementRef.current?.getBoundingClientRect()
            const centerY = window.innerHeight / 2
            const centerYMin = centerY - 300
            const centerYMax = centerY + 300

            const isElementCentered = rect.top >= centerYMin && rect.bottom <= centerYMax
            setInMiddle(isElementCentered)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return inMiddle
}
