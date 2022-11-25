"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const invoiceLines_schema_1 = __importDefault(require("./invoiceLines.schema"));
exports.default = (0, yup_1.object)({
    id: (0, yup_1.string)().max(255),
    amount: (0, yup_1.number)(),
    paid: (0, yup_1.bool)(),
    dueDate: (0, yup_1.date)(),
    mva: (0, yup_1.number)(),
    orgNumber: (0, yup_1.string)().max(255),
    ourReferenceId: (0, yup_1.string)().max(255),
    theirReferenceId: (0, yup_1.string)().max(255),
    invoiceLines: (0, yup_1.array)(invoiceLines_schema_1.default)
});
