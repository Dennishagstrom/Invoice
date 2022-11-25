export interface OfferLine {
    id: string
    description: string
    quantity: number
    price: number
    discount: number
    comment: string | null
    offerId: string
    productId: string | null
}