import { UserProviderProps } from 'lib/types'

export interface BaseOlfuProviderProps {
    userValue?: UserProviderProps['value']
}

export interface OlfuProviderProps extends BaseOlfuProviderProps, React.PropsWithChildren {}
