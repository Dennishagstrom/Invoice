import {object, string, number, bool, date} from 'yup'

export default object({
    description: string().max(255),
    quantity: number(),
    price: number(),
    discount: number(),
    comment: string().max(255),
    offerId: string().max(255),
    productId: string()
});