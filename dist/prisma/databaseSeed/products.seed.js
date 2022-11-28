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
exports.randomProduct = exports.randomCategory = exports.seedProducts = void 0;
const faker_1 = require("@faker-js/faker");
const seed_1 = require("../seed");
const client_1 = __importDefault(require("../../src/utils/client"));
// Faker Norwegian
faker_1.faker.locale = 'nb_NO';
function seedProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < seed_1.fakerRounds; i++) {
            yield client_1.default.products.create({
                data: {
                    id: faker_1.faker.random.numeric(5),
                    name: faker_1.faker.commerce.productName(),
                    unitPrice: parseInt(faker_1.faker.commerce.price()),
                    note: faker_1.faker.lorem.sentence(),
                    active: true,
                    categoryId: yield randomCategory()
                }
            });
        }
    });
}
exports.seedProducts = seedProducts;
function randomCategory() {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield client_1.default.category.findMany();
        const random = Math.floor(Math.random() * categories.length);
        return categories[random].id;
    });
}
exports.randomCategory = randomCategory;
function randomProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield client_1.default.products.findMany();
        const random = Math.floor(Math.random() * products.length);
        return products[random].id;
    });
}
exports.randomProduct = randomProduct;
