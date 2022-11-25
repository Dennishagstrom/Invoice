import {Contact} from "./contact";
import {OfferLine} from "./offerLine";

export interface Offer {
    id: string
    orgNumber: string
    amount: number
    validUntil: Date
    accepted: boolean
    createdAt: Date
    updatedAt: Date
    contact: Contact | null
    ourReferenceId: string | null
    theirReferenceId: string | null
    offerLines: OfferLine[]
}