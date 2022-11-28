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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedInvoices = void 0;
const faker_1 = require("@faker-js/faker");
const seed_1 = require("../seed");
const client_1 = __importDefault(require("../../src/utils/client"));
const products_seed_1 = require("./products.seed");
const contact_seed_1 = require("./contact.seed");
// Faker Norwegian
faker_1.faker.locale = 'nb_NO';
function seedInvoices() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < seed_1.fakerRounds; i++) {
            yield client_1.default.invoice.create({
                data: {
                    id: faker_1.faker.random.numeric(5),
                    orgNumber: yield randomContact(),
                    amount: parseInt(faker_1.faker.commerce.price()),
                    dueDate: faker_1.faker.date.future(),
                    ourReferenceId: yield (0, contact_seed_1.randomUser)(),
                    theirReferenceId: yield (0, contact_seed_1.randomContactPerson)(),
                    invoiceLines: {
                        create: yield fakeInvoiceLine(),
                    }
                }
            });
        }
    });
}
exports.seedInvoices = seedInvoices;
function randomContact() {
    return __awaiter(this, void 0, void 0, function* () {
        const contacts = yield client_1.default.contact.findMany();
        const random = Math.floor(Math.random() * contacts.length);
        return contacts[random].orgNumber;
    });
}
const fakeInvoiceLine = () => __awaiter(void 0, void 0, void 0, function* () {
    return ({
        description: faker_1.faker.lorem.word(),
        quantity: parseInt(faker_1.faker.random.numeric(1)),
        price: parseInt(faker_1.faker.commerce.price()),
        discount: 0,
        comment: faker_1.faker.lorem.sentence(),
        productId: yield (0, products_seed_1.randomProduct)()
    });
});
