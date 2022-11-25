// import {Email} from "../types/email";
// import {Invoice} from "../types/invoice";
//
// const sgMail = require('@sendgrid/mail')
//
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//
// export async function sendInvoice(request: any, invoice: Invoice) {
//     const {to, subject, text} = request
// const invoiceLines = invoice.invoiceLines
// const allLines = []

// for (const invoiceLine of invoiceLines) {
//     const line = {
//         invoiceLine.description,
//         invoiceLine.quantity,
//         invoiceLine.price,
//         invoiceLine.discount,
//         invoiceLine.comment}
//
//     console.log(line)
// }

// const msg = {
//     to,
//     from: 'dennis@gait.no',
//     subject,
//     text: `Hei, fakturanummer ${invoice.invoiceNumber}, med beløp: ${invoice.amount}. Den ble opprettet ${invoice.createdAt}.
//     Fakturaen er for ${invoice.contact?.name}.`,
// }

// sgMail
//     .send(msg)
//     .then(() => {
//         console.log('Email sent')
//     })
// }

