import {Product} from './product';

export interface Category {
    id: string
    name: string
    note: string | null
    createdAt: Date
    updatedAt: Date
    products: Product[]
}