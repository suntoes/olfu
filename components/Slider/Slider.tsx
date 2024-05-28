'use client'

import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { Children, useCallback, useEffect, useState } from 'react'
import AngleRight from 'public/assets/icons/AngleRight.svg'
import AngleLeft from 'public/assets/icons/AngleLeft.svg'
import useEmblaCarousel from 'embla-carousel-react'
import { SliderProps } from 'lib/types'
import './SliderStyles.scss'

export const Slider = ({
    children,
    className,
    clickable,
    direction = 'horizontal',
    startIndex: startIndexProp = 0,
    ...props
}: SliderProps): JSX.Element => {
    const childrenArr = Children.toArray(children)
    const startIndex = startIndexProp < childrenArr.length ? startIndexProp : 0

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            startIndex,
            align: 'center',
            skipSnaps: true,
            axis: direction === 'horizontal' ? 'x' : 'y',
        },
        [WheelGesturesPlugin({})],
    )
    const [selectedIndex, setSelectedIndex] = useState(startIndex)

    const onPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const onNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi && index !== -1) emblaApi.scrollTo(index)
        },
        [emblaApi],
    )

    // Embla API to react's state
    const onSelect: any = useCallback(
        (_emblaApi: any, eventName: any) => {
            if (emblaApi) setSelectedIndex(emblaApi?.selectedScrollSnap() || 0)
        },
        [emblaApi],
    )

    const removeOnSelectListener = useCallback(() => {
        if (emblaApi) emblaApi.off('select', onSelect)
    }, [emblaApi, onSelect])

    useEffect(() => {
        if (emblaApi) emblaApi.on('select', onSelect)
        return removeOnSelectListener
    }, [emblaApi, onSelect, removeOnSelectListener])
    // ^^^

    return (
        <div className={[className, 'slider', `slider--${direction}`].join(' ')} {...props}>
            <div className='slider__wrapper'>
                <div ref={emblaRef}>
                    <div className='slider__flex'>
                        {childrenArr.map((child, index) => (
                            <div
                                key={index}
                                className={[
                                    'slider__flex__item',
                                    index === selectedIndex
                                        ? 'slider__flex__item--active'
                                        : 'slider__flex__item--inactive',
                                    clickable ? 'slider__flex__item--clickable' : '',
                                    index === selectedIndex - 1
                                        ? 'slider__flex__item--next slider__flex__item--next--prev'
                                        : '',
                                    index === selectedIndex + 1
                                        ? 'slider__flex__item--next slider__flex__item--next--next'
                                        : '',
                                ].join(' ')}
                                onClick={() => scrollTo(clickable ? index : -1)}
                            >
                                {child}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='slider__control__container'>
                    <button
                        onClick={onPrev}
                        className={[
                            'slider__control',
                            'slider__control--left',
                            selectedIndex === 0 ? 'slider__control--inactive' : '',
                        ].join(' ')}
                    >
                        <AngleLeft />
                    </button>
                    <button
                        onClick={onNext}
                        className={[
                            'slider__control',
                            'slider__control--next',
                            selectedIndex >= childrenArr?.length - 1 ? 'slider__control--inactive' : '',
                        ].join(' ')}
                    >
                        <AngleRight />
                    </button>
                </div>
            </div>
        </div>
    )
}
