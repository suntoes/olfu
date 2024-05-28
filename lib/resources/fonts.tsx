import localFont from 'next/font/local'

export const geogrotesque_wide = localFont({
    src: [
        {
            path: '../../public/assets/fonts/geogrotesque-wide/GeogrotesqueWide-Th.ttf',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../../public/assets/fonts/geogrotesque-wide/GeogrotesqueWide-Lt.ttf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../public/assets/fonts/geogrotesque-wide/GeogrotesqueWide-Rg.ttf',
            weight: 'normal',
            style: 'normal',
        },
        {
            path: '../../public/assets/fonts/geogrotesque-wide/GeogrotesqueWide-Md.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../public/assets/fonts/geogrotesque-wide/GeogrotesqueWide-SmBd.ttf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../public/assets/fonts/geogrotesque-wide/GeogrotesqueWide-Bd.ttf',
            weight: 'bold',
            style: 'normal',
        },
    ],
})

export const burbank_big_condensed = localFont({
    src: [
        {
            path: '../../public/assets/fonts/burbank-big-condensed/Burbank-Big-Condensed-Bold.otf',
            weight: 'bold',
            style: 'normal',
        },
        {
            path: '../../public/assets/fonts/burbank-big-condensed/Burbank-Big-Condensed-Black.otf',
            weight: '900',
            style: 'normal',
        },
    ],
})
