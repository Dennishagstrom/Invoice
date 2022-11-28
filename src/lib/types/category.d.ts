import {Product} from './product';

export interface Category {
    name: string
    note: string | null
    createdAt?: Date
    updatedAt?: Date
    products?: Product[]
}