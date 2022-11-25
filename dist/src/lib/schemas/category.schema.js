"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const product_schema_1 = __importDefault(require("./product.schema"));
exports.default = (0, yup_1.object)({
    name: (0, yup_1.string)().max(255),
    note: (0, yup_1.string)().max(255),
    products: (0, yup_1.array)(product_schema_1.default)
});
