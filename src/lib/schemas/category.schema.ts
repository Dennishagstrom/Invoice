import {object, string, array} from 'yup'
import productSchema from "./product.schema";

export default object({
    name: string().max(255),
    note: string().max(255),
    products: array(productSchema)
});