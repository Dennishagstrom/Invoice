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
exports.deleteContact = exports.updateContact = exports.newContact = exports.findContactById = exports.getContacts = void 0;
const client_1 = __importDefault(require("../utils/client"));
const errorHandler_1 = require("./errorHandler");
function getContacts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const contacts = yield client_1.default.contact.findMany();
        res.status(200).json({
            message: 'All contacts',
            data: contacts
        });
    });
}
exports.getContacts = getContacts;
function findContactById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = req.query;
        try {
            const { id } = req.params;
            const contact = yield client_1.default.contact.findUnique({
                where: {
                    orgNumber: id
                },
                include: {
                    invoices: !!params.includeInvoices,
                    contactOwner: !!params.includeContactOwner,
                    contactPersons: !!params.includeContactPersons,
                }
            });
            return res.status(200).json({
                message: "OK",
                data: contact
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.findContactById = findContactById;
function newContact(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const newContact = yield client_1.default.contact.create({
                data: {
                    orgNumber: data.orgNumber,
                    name: data.name,
                    phone: data.phone,
                    address: data.address,
                    houseNumber: data.houseNumber,
                    postalCode: data.postalCode,
                    city: data.city,
                    country: data.country,
                    type: data.type,
                    contactOwnerId: data.contactOwnerId
                }
            });
            return res.status(201).json({
                message: 'Contact created',
                data: newContact
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.newContact = newContact;
function updateContact(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedContact = yield client_1.default.contact.update({
                where: {
                    orgNumber: id
                },
                data: {
                    orgNumber: data.orgNumber,
                    name: data.name,
                    phone: data.phone,
                    address: data.address,
                    houseNumber: data.houseNumber,
                    postalCode: data.postalCode,
                    city: data.city,
                    country: data.country,
                    type: data.type,
                    contactOwnerId: data.contactOwnerId
                }
            });
            return res.status(200).json({
                message: "Contact updated",
                data: updatedContact
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.updateContact = updateContact;
function deleteContact(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deletedContact = yield client_1.default.contact.delete({
                where: {
                    orgNumber: id
                }
            });
            return res.status(200).json({
                message: "Contact deleted",
                data: deletedContact
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.deleteContact = deleteContact;
