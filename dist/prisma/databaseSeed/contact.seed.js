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
exports.randomContactPerson = exports.seedContacts = exports.randomUser = void 0;
const faker_1 = require("@faker-js/faker");
const client_1 = __importDefault(require("../../src/utils/client"));
const seed_1 = require("../seed");
// Faker Norwegian
faker_1.faker.locale = 'nb_NO';
const fakeContactPerson = () => ({
    firstName: faker_1.faker.name.firstName(),
    lastName: faker_1.faker.name.lastName(),
    phone: faker_1.faker.phone.number(),
    email: faker_1.faker.internet.email(),
});
// Choose random user from database
function randomUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield client_1.default.user.findMany();
        const random = Math.floor(Math.random() * users.length);
        return users[random].id;
    });
}
exports.randomUser = randomUser;
// Creates random customers and contact persons
function seedContacts() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < seed_1.fakerRounds; i++) {
            yield client_1.default.contact.create({
                data: {
                    orgNumber: faker_1.faker.random.numeric(9),
                    type: 'CUSTOMER',
                    name: faker_1.faker.name.firstName(),
                    phone: faker_1.faker.phone.number(),
                    address: faker_1.faker.address.streetAddress(),
                    houseNumber: faker_1.faker.random.numeric(2),
                    postalCode: faker_1.faker.random.numeric(4),
                    city: 'Oslo',
                    country: 'Norge',
                    contactOwnerId: yield randomUser(),
                    contactPersons: {
                        create: fakeContactPerson(),
                    },
                }
            });
        }
    });
}
exports.seedContacts = seedContacts;
// Random ContactPerson from Database
function randomContactPerson() {
    return __awaiter(this, void 0, void 0, function* () {
        const contactPersons = yield client_1.default.contactPerson.findMany();
        const random = Math.floor(Math.random() * contactPersons.length);
        return contactPersons[random].id;
    });
}
exports.randomContactPerson = randomContactPerson;
