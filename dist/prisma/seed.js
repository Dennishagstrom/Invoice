"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDb = exports.randomElement = exports.fakerRounds = void 0;
const user_seed_1 = require("./databaseSeed/user.seed");
const contact_seed_1 = require("./databaseSeed/contact.seed");
const category_seed_1 = require("./databaseSeed/category.seed");
const products_seed_1 = require("./databaseSeed/products.seed");
const invoice_seed_1 = require("./databaseSeed/invoice.seed");
exports.fakerRounds = 100;
const randomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};
exports.randomElement = randomElement;
function seedDb() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, user_seed_1.seedUsers)();
        yield (0, user_seed_1.seedEmployees)();
        yield (0, contact_seed_1.seedContacts)();
        yield (0, category_seed_1.seedCategories)();
        yield (0, products_seed_1.seedProducts)();
        yield (0, invoice_seed_1.seedInvoices)();
    });
}
exports.seedDb = seedDb;
