import {faker} from "@faker-js/faker";
import prisma from "../../src/utils/client";
import {fakerRounds} from "../seed";

// Faker Norwegian
faker.locale = 'nb_NO';

const fakeContactPerson = () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
});

// Choose random user from database
export async function randomUser() {
    const users = await prisma.user.findMany();
    const random = Math.floor(Math.random() * users.length);
    return users[random].id;
}

// Creates random customers and contact persons
export async function seedContacts() {
    for (let i = 0; i < fakerRounds; i++) {
        await prisma.contact.create({
            data: {
                orgNumber: faker.random.numeric(9),
                type: 'CUSTOMER',
                name: faker.name.firstName(),
                phone: faker.phone.number(),
                address: faker.address.streetAddress(),
                houseNumber: faker.random.numeric(2),
                postalCode: faker.random.numeric(4),
                city: 'Oslo',
                country: 'Norge',
                contactOwnerId: await randomUser(),
                contactPersons: {
                    create: fakeContactPerson(),
                },
            }
        });
    }
}

// Random ContactPerson from Database
export async function randomContactPerson() {
    const contactPersons = await prisma.contactPerson.findMany();
    const random = Math.floor(Math.random() * contactPersons.length);
    return contactPersons[random].id;
}



