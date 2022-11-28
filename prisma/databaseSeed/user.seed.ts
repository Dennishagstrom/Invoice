import {faker} from '@faker-js/faker';
import {User} from "../../src/lib/types/user";
import prisma from "../../src/utils/client";
import {fakerRounds} from "../seed";

const bcrypt = require('bcrypt');

// Faker Norwegian
faker.locale = 'nb_NO';

// Generates hashed password for fake user
const passwordHash = (pw: string): string => {
    return bcrypt.hashSync(pw, 10);
}

export const fakerUser = (): User => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: passwordHash('passord'),
    role: 'USER',
});

export const userDennis: User = {
    firstName: 'Dennis',
    lastName: 'Hagström',
    email: 'dennis@gait.no',
    password: passwordHash('1234'),
    role: 'ADMIN',
};

export const userOle: User = {
    firstName: 'Ole',
    lastName: 'Walberg',
    email: 'ole@gait.no',
    password: passwordHash('1234'),
    role: 'ADMIN',
};

export const userLinus: User = {
    firstName: 'Linus',
    lastName: 'Johnsen',
    email: 'linus@gait.no',
    password: passwordHash('1234'),
    role: 'ADMIN',
};

// Creates random users
export async function seedUsers() {
    for (let i = 0; i < fakerRounds; i++) {
        await prisma.user.create({data: fakerUser()});
    }
}

// Create employee users
export async function seedEmployees() {
    await prisma.user.createMany({
        data: [userOle, userLinus, userDennis],
    });
}
