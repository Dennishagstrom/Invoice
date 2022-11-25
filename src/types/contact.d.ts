type Type = "CUSTOMER" | "CONTACT"

export interface Contact {
    orgNumber: string
    type: Type
    name: string
    phone: string
    address: string
    houseNumber: string
    postalCode: string
    city: string
    country: string
    createdAt: Date
    updatedAt: Date
    contactOwnerId?: string | null
}
