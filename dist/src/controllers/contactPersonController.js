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
exports.deleteContactPerson = exports.updateContactPerson = exports.newContactPerson = exports.getContactPerson = exports.getContactPersons = void 0;
const client_1 = __importDefault(require("../utils/client"));
const errorHandler_1 = require("./errorHandler");
function getContactPersons(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const contactPersons = yield client_1.default.contactPerson.findMany();
        res.status(200).json({
            message: 'All contact persons',
            data: contactPersons
        });
    });
}
exports.getContactPersons = getContactPersons;
function getContactPerson(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const contactPerson = yield client_1.default.contactPerson.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: {
                    contact: true,
                }
            });
            return res.status(200).json({
                message: "OK",
                data: contactPerson
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.getContactPerson = getContactPerson;
function newContactPerson(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const contactPerson = yield client_1.default.contactPerson.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    orgNumber: data.orgNumber
                },
                include: {
                    contact: true
                }
            });
            return res.status(201).json({
                message: 'Contact person created',
                data: contactPerson
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.newContactPerson = newContactPerson;
function updateContactPerson(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedContactPerson = yield client_1.default.contactPerson.update({
                where: {
                    id: id
                },
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    orgNumber: data.orgNumber
                }
            });
            return res.status(200).json({
                message: "Contact person updated",
                data: updatedContactPerson
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.updateContactPerson = updateContactPerson;
function deleteContactPerson(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const contactPerson = yield client_1.default.contactPerson.delete({
                where: {
                    id: id
                }
            });
            return res.status(200).json({
                message: "Contact person deleted",
                data: contactPerson
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.deleteContactPerson = deleteContactPerson;
