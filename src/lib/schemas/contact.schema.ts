import {object, string, array} from 'yup'
import contactPersonSchema from "./contactPerson.schema";

export default object({
    orgNumber: string().max(255),
    type: string().max(255),
    name: string().max(255),
    phone: string().max(255),
    address: string().max(255),
    houseNumber: string().max(255),
    postalCode: string().max(255),
    city: string().max(255),
    country: string().max(255),
    contactOwnerId: string().max(255),
    contactPersons: array(contactPersonSchema)
})