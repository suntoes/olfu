'use client'

export type BreakpointType = 'base' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export const breakpoints: { [key: string]: number } = {
    xxl: 1536,
    xl: 1280,
    lg: 1024,
    md: 768,
    sm: 640,
    xs: 512,
    xxs: 384,
    base: 0,
}

export const getCurrentBreakpoint = (window: Window & typeof globalThis): BreakpointType => {
    const { innerWidth } = window
    const breakpointKeys: BreakpointType[] = Array.from(Object.keys(breakpoints) as BreakpointType[])
    for (let i = 0; i < breakpointKeys.length; i++) {
        if (innerWidth >= breakpoints[breakpointKeys[i]]) return breakpointKeys[i]
    }

    return 'base'
}

export const getBreakpoints = (window: Window & typeof globalThis, breakpoint?: BreakpointType): BreakpointType[] => {
    const breaks: BreakpointType[] = []

    const { innerWidth } = window
    let width = innerWidth
    if (breakpoint) width = breakpoints[breakpoint] || innerWidth

    const breakpointKeys: BreakpointType[] = Array.from(Object.keys(breakpoints) as BreakpointType[])
    for (let i = 0; i < breakpointKeys.length; i++) {
        if (width >= breakpoints[breakpointKeys[i]]) breaks.push(breakpointKeys[i])
    }

    return breaks
}
