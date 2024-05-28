import { StaticImageData } from 'next/image'
import React from 'react'

export type ImageMetaData = StaticImageData

export interface SVGRComponent extends React.FC<React.ComponentProps<'svg'>> {}

export type JSType = Record<string, string>
