'use client'

import { getBreakpoints, getCurrentBreakpoint } from 'lib/utils'
import { useEffect, useMemo, useState } from 'react'

export function useBreakpoint() {
    const [breakpoint, setBreakpoint] = useState('base')
    const [breakpoints, setBreakpoints] = useState(['base'])
    const isXXL = useMemo(() => breakpoints.includes('xxl'), [breakpoints])
    const isXL = useMemo(() => breakpoints.includes('xl'), [breakpoints])
    const isLG = useMemo(() => breakpoints.includes('lg'), [breakpoints])
    const isMD = useMemo(() => breakpoints.includes('md'), [breakpoints])
    const isSM = useMemo(() => breakpoints.includes('sm'), [breakpoints])
    const isXS = useMemo(() => breakpoints.includes('xs'), [breakpoints])
    const isXXS = useMemo(() => breakpoints.includes('xxs'), [breakpoints])

    useEffect(() => {
        function handleResize() {
            setBreakpoint(getCurrentBreakpoint(window))
            setBreakpoints(getBreakpoints(window))
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return {
        breakpoint,
        breakpoints,
        isXXL,
        isXL,
        isLG,
        isMD,
        isSM,
        isXS,
        isXXS,
    }
}
