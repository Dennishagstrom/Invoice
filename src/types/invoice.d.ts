import {Contact} from "./contact";
import {InvoiceLine} from "./invoiceLine";

export interface Invoice {
    id: string
    orgNumber: string
    amount: number
    paid: boolean
    dueDate: Date
    mva: number | null
    createdAt: Date
    updatedAt: Date
    contact: Contact | null
    ourReferenceId: string | null
    theirReferenceId: string | null
    invoiceLines: InvoiceLine[]
}