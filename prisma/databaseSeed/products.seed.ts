import {faker} from '@faker-js/faker';
import {Product} from "../../src/lib/types/product";
import {fakerRounds} from "../seed";
import prisma from "../../src/utils/client";

// Faker Norwegian
faker.locale = 'nb_NO';

export async function seedProducts() {
    for (let i = 0; i < fakerRounds; i++) {
        await prisma.products.create({
            data: {
                id: faker.random.numeric(5),
                name: faker.commerce.productName(),
                unitPrice: parseInt(faker.commerce.price()),
                note: faker.lorem.sentence(),
                active: true,
                categoryId: await randomCategory()
            }
        });
    }
}

export async function randomCategory() {
    const categories = await prisma.category.findMany();
    const random = Math.floor(Math.random() * categories.length);
    return categories[random].id;
}


export async function randomProduct() {
    const products = await prisma.products.findMany();
    const random = Math.floor(Math.random() * products.length);
    return products[random].id;
}