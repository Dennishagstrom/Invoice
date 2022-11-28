import {Contact} from "./contact";

export interface ContactPerson {
    firstName: string
    lastName: string
    email: string
    phone: string
    createdAt?: string
    updatedAt?: string
    orgNumber: string
    contact: Contact
}