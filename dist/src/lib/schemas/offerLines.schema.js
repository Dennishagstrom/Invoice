"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
exports.default = (0, yup_1.object)({
    description: (0, yup_1.string)().max(255),
    quantity: (0, yup_1.number)(),
    price: (0, yup_1.number)(),
    discount: (0, yup_1.number)(),
    comment: (0, yup_1.string)().max(255),
    offerId: (0, yup_1.string)().max(255),
    productId: (0, yup_1.string)()
});
