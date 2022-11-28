import {seedUsers, seedEmployees} from "./databaseSeed/user.seed";
import {seedContacts} from "./databaseSeed/contact.seed";
import {seedCategories} from "./databaseSeed/category.seed";
import {seedProducts} from "./databaseSeed/products.seed";
import {seedInvoices} from "./databaseSeed/invoice.seed";

export const fakerRounds = 100;

export const randomElement = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
};

export async function seedDb() {
    await seedUsers();
    await seedEmployees();
    await seedContacts();
    await seedCategories();
    await seedProducts();
    await seedInvoices();
}
