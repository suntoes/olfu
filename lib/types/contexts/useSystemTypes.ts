export interface SystemContextValue {
    info: any
    setInfo: React.Dispatch<React.SetStateAction<SystemContextValue['info']>>
    // [ ] TODO: Withdraw Cart Skin Item type
    cart: any[]
    setCart: React.Dispatch<React.SetStateAction<SystemContextValue['cart']>>
    loading: 'website' | 'page' | 'modal' | null
    setLoading: React.Dispatch<React.SetStateAction<SystemContextValue['loading']>>
    maintenance: boolean
    setMaintenance: React.Dispatch<React.SetStateAction<SystemContextValue['maintenance']>>
}

export type SystemContextType = SystemContextValue | null

export interface SystemProviderProps {
    children: React.ReactNode
}
