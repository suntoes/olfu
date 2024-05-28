declare module '*.png' {
    import type { ImageMetaData } from 'lib/types/custom/assets'
    const content: ImageMetaData
    export default content
}

declare module '*.svg' {
    import type { SVGRComponent } from 'lib/types/custom/assets'
    const content: SVGRComponent
    export default content
}

declare module '*.svg?url' {
    import type { ImageMetaData } from 'lib/types/custom/assets'
    const content: ImageMetaData
    export default content
}

declare module '*.scss' {
    import type { SassType } from 'lib/types/custom/styles'
    const content: SassType
    export default content
}

declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_API_URL: string
        NEXT_PUBLIC_DEPLOYMENT: 'DEVELOPMENT' | 'PRODUCTION'
    }
}
