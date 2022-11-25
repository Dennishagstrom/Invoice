"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
exports.default = (0, yup_1.object)({
    invoiceNumber: (0, yup_1.string)(),
    amount: (0, yup_1.number)(),
    paid: (0, yup_1.bool)(),
    dueDate: (0, yup_1.date)(),
    mva: (0, yup_1.number)(),
    orgNumber: (0, yup_1.string)(),
    ourReferenceId: (0, yup_1.string)(),
    theirReferenceId: (0, yup_1.string)(),
    invoiceLines: (0, yup_1.object)({
        description: (0, yup_1.string)(),
        quantity: (0, yup_1.number)(),
        price: (0, yup_1.number)(),
        discount: (0, yup_1.number)(),
        comment: (0, yup_1.string)()
    })
});
