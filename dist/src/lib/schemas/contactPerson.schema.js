"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
exports.default = (0, yup_1.object)({
    firstName: (0, yup_1.string)().max(255),
    lastName: (0, yup_1.string)().max(255),
    email: (0, yup_1.string)().max(255).email(),
    phone: (0, yup_1.string)().max(255),
    orgNumber: (0, yup_1.string)().max(255)
});
