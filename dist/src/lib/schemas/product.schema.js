"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
exports.default = (0, yup_1.object)({
    idr: (0, yup_1.string)().max(255),
    name: (0, yup_1.string)().max(255),
    unitPrice: (0, yup_1.number)(),
    note: (0, yup_1.string)().max(255),
    active: (0, yup_1.bool)(),
    categoryId: (0, yup_1.string)().max(255),
});
