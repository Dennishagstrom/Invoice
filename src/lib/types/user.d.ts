import userRoles from '..lib/enums/userRoles'

export interface User {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    role: userRoles
    createdAt?: Date
    updatedAt?: Date
}