import {object, string} from 'yup'

export default object({
    firstName: string().max(255),
    lastName: string().max(255),
    email: string().max(255).email(),
    password: string().max(255).min(6),
    role: string().max(255).oneOf(['USER', 'ADMIN'])
})



