"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
exports.default = (0, yup_1.object)({
    firstName: (0, yup_1.string)(),
    lastName: (0, yup_1.string)(),
    email: (0, yup_1.string)().email(),
    password: (0, yup_1.string)().min(6),
    role: (0, yup_1.string)().oneOf(['USER', 'ADMIN'])
});
