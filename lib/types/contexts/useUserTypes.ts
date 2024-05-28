export interface User {
    student_id: string | null
    first_name: string | null
    middle_name: string | null
    last_name: string | null
    username: string | null
    course: string | null
    year_level: string | null
    gender: string | null
    date_of_birth: string | null
    nationality: string | null
    marital_status: string | null
    contact_no: string | null
    street: string | null
    brgy: string | null
    city: string | null
    country: string | null
    zipcode: string | null
    profile_pic: string | null
}

export interface UserContextValue {
    logoutUser: () => void
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<UserContextValue['user']>>
}

export type UserContextType = UserContextValue | null

export interface UserProviderProps {
    children: React.ReactNode
    value?: {
        user?: UserContextValue['user']
    }
}
