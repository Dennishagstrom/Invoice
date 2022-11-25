import {object, string, array, bool} from 'yup'

export default object({
    firstName: string().max(255),
    lastName: string().max(255),
    email: string().max(255).email(),
    phone: string().max(255),
    orgNumber: string().max(255)
})