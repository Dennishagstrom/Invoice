import {object, string, number, bool, date, array} from 'yup'
import invoiceLinesSchema from './invoiceLines.schema'

export default object({
    id: string().max(255),
    amount: number(),
    paid: bool(),
    dueDate: date(),
    mva: number(),
    orgNumber: string().max(255),
    ourReferenceId: string().max(255),
    theirReferenceId: string().max(255),
    invoiceLines: array(invoiceLinesSchema)
})



