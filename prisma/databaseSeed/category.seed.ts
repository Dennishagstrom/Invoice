import {faker} from '@faker-js/faker';
import {Category} from "../../src/lib/types/category";
import prisma from "../../src/utils/client";

// Faker Norwegian
faker.locale = 'nb_NO';

const fakeCategory = (): Category => ({
    name: faker.random.word(),
    note: faker.lorem.sentence()
});


// Create random categories
export async function seedCategories() {
    for (let i = 0; i < 15; i++) {
        await prisma.category.createMany({data: fakeCategory()});
    }
}
