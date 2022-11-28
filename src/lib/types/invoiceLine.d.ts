export interface InvoiceLine {
    id: string
    description: string
    quantity: number
    price: number
    discount?: number
    comment: string | null
    invoiceId: string | null
    productId: string | null
}