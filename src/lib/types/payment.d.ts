import {Invoice} from "./invoice";

export interface Payment {
    paymentId: string
    amount: number
    paid: boolean
    createdAt: Date
    updatedAt: Date
    invoice: Invoice
    invoiceNumber: string
}