import {object, string, number, bool} from 'yup'

export default object({
    idr: string().max(255),
    name: string().max(255),
    unitPrice: number(),
    note: string().max(255),
    active: bool(),
    categoryId: string().max(255),
});