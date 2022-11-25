"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
exports.default = (0, yup_1.object)({
    body: (0, yup_1.object)({
        firstName: (0, yup_1.string)().required('First name is required'),
        lastName: (0, yup_1.string)().required('Last name is required'),
        email: (0, yup_1.string)().email('Must be a valid email').required('Email is required'),
        password: (0, yup_1.string)().required('Password is required').min(6, 'Password must be at least 6 characters'),
        role: (0, yup_1.string)().required('Role is required').oneOf(['USER', 'ADMIN'], 'Role must be either USER or ADMIN')
    })
});
