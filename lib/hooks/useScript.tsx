'use client'

import { useEffect, useRef } from 'react'

export function useScript({ src, id }: { src: string; id: string }) {
    const hasLoaded = useRef<boolean>(false)

    useEffect(() => {
        const currentScript = document.getElementById(id)
        if (!!currentScript || hasLoaded.current) return
        hasLoaded.current = true

        const script = document.createElement('script')
        script.id = id
        script.src = src
        script.async = true
        document.body.appendChild(script)
        return () => {
            document.body.removeChild(script)
        }
    }, [id, src])

    return <></>
}
