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
exports.seedEmployees = exports.seedUsers = exports.userLinus = exports.userOle = exports.userDennis = exports.fakerUser = void 0;
const faker_1 = require("@faker-js/faker");
const client_1 = __importDefault(require("../../src/utils/client"));
const seed_1 = require("../seed");
const bcrypt = require('bcrypt');
// Faker Norwegian
faker_1.faker.locale = 'nb_NO';
// Generates hashed password for fake user
const passwordHash = (pw) => {
    return bcrypt.hashSync(pw, 10);
};
const fakerUser = () => ({
    firstName: faker_1.faker.name.firstName(),
    lastName: faker_1.faker.name.lastName(),
    email: faker_1.faker.internet.email(),
    password: passwordHash('passord'),
    role: 'USER',
});
exports.fakerUser = fakerUser;
exports.userDennis = {
    firstName: 'Dennis',
    lastName: 'Hagström',
    email: 'dennis@gait.no',
    password: passwordHash('1234'),
    role: 'ADMIN',
};
exports.userOle = {
    firstName: 'Ole',
    lastName: 'Walberg',
    email: 'ole@gait.no',
    password: passwordHash('1234'),
    role: 'ADMIN',
};
exports.userLinus = {
    firstName: 'Linus',
    lastName: 'Johnsen',
    email: 'linus@gait.no',
    password: passwordHash('1234'),
    role: 'ADMIN',
};
// Creates random users
function seedUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < seed_1.fakerRounds; i++) {
            yield client_1.default.user.create({ data: (0, exports.fakerUser)() });
        }
    });
}
exports.seedUsers = seedUsers;
// Create employee users
function seedEmployees() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client_1.default.user.createMany({
            data: [exports.userOle, exports.userLinus, exports.userDennis],
        });
    });
}
exports.seedEmployees = seedEmployees;
