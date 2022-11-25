import {Category} from './category';

export interface Product {
    id: string
    name: string
    unitPrice: number
    note: string | null
    active: boolean
    createdAt: Date
    updatedAt: Date
    category: Category | null
    categoryId: string | null
}