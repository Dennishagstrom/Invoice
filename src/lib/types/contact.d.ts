type Type = "CUSTOMER" | "CONTACT"
import {ContactPerson} from "./contactPerson";

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
    createdAt?: Date
    updatedAt?: Date
    contactOwnerId?: string | null
    contactPersons: ContactPerson[]
}
