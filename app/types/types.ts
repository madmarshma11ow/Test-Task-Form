export type Values = {
    firstName: string
    cities: string
    password: string
    repeatPassword: string
    phoneNumber?: string
    emailAddress?: string
}

export type FieldProps = {
    id: string
    name: string
    type: string
    placeholder: string
    label: string
    required: boolean
    value: string | undefined
}

export type City = {
    city: string
    population: string
}