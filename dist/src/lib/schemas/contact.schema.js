"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const contactPerson_schema_1 = __importDefault(require("./contactPerson.schema"));
exports.default = (0, yup_1.object)({
    orgNumber: (0, yup_1.string)().max(255),
    type: (0, yup_1.string)().max(255),
    name: (0, yup_1.string)().max(255),
    phone: (0, yup_1.string)().max(255),
    address: (0, yup_1.string)().max(255),
    houseNumber: (0, yup_1.string)().max(255),
    postalCode: (0, yup_1.string)().max(255),
    city: (0, yup_1.string)().max(255),
    country: (0, yup_1.string)().max(255),
    contactOwnerId: (0, yup_1.string)().max(255),
    contactPersons: (0, yup_1.array)(contactPerson_schema_1.default)
});
