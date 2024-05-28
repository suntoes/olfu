export interface BaseSliderProps {
    children?: React.ReactNode[]
    clickable?: boolean
    direction?: 'horizontal' | 'vertical'
    startIndex?: number
}

export interface SliderProps extends BaseSliderProps, Omit<React.ComponentProps<'div'>, 'children'> {}
