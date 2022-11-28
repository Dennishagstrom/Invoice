import {faker} from '@faker-js/faker';
import {fakerRounds} from "../seed";
import prisma from "../../src/utils/client";

import {randomProduct} from "./products.seed";
import {parse} from "url";
import {randomContactPerson, randomUser} from "./contact.seed";

// Faker Norwegian
faker.locale = 'nb_NO';


export async function seedInvoices() {
    for (let i = 0; i < fakerRounds; i++) {
        await prisma.invoice.create({
            data: {
                id: faker.random.numeric(5),
                orgNumber: await randomContact(),
                amount: parseInt(faker.commerce.price()),
                dueDate: faker.date.future(),
                ourReferenceId: await randomUser(),
                theirReferenceId: await randomContactPerson(),
                invoiceLines: {
                    create: await fakeInvoiceLine(),
                }
            }
        });
    }
}

async function randomContact() {
    const contacts = await prisma.contact.findMany();
    const random = Math.floor(Math.random() * contacts.length);
    return contacts[random].orgNumber;
}


const fakeInvoiceLine = async () => ({
    description: faker.lorem.word(),
    quantity: parseInt(faker.random.numeric(1)),
    price: parseInt(faker.commerce.price()),
    discount: 0,
    comment: faker.lorem.sentence(),
    productId: await randomProduct()
})