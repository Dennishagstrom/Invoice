import {object, string, number, date, array} from 'yup'
import offerLinesSchema from './offerLines.schema'

export default object({
    id: string().max(255),
    amount: number(),
    validUntil: date(),
    orgNumber: string().max(255),
    ourReferenceId: string().max(255),
    theirReferenceId: string().max(255),
    offerLines: array(offerLinesSchema)
})
