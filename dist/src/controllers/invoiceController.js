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
exports.deleteInvoice = exports.updateInvoice = exports.newInvoice = exports.getInvoice = exports.getInvoices = void 0;
const client_1 = __importDefault(require("../utils/client"));
const errorHandler_1 = require("./errorHandler");
function getInvoices(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const invoices = client_1.default.invoice.findMany();
        return res.status(200).json({
            message: 'All invoices',
            data: invoices
        });
    });
}
exports.getInvoices = getInvoices;
function getInvoice(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const invoice = yield client_1.default.invoice.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: {
                    contact: true,
                    invoiceLines: true
                }
            });
            return res.status(200).json({
                message: "OK",
                data: invoice
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.getInvoice = getInvoice;
function newInvoice(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const invoice = yield client_1.default.invoice.create({
                data: {
                    id: data.id,
                    amount: data.amount,
                    paid: data.paid,
                    dueDate: data.dueDate,
                    orgNumber: data.orgNumber,
                    ourReferenceId: data.ourReferenceId,
                    theirReferenceId: data.theirReferenceId,
                    invoiceLines: {
                        create: data.invoiceLines.map((line) => {
                            return {
                                description: line.description,
                                quantity: line.quantity,
                                price: line.price,
                                discount: line.discount,
                                comment: line.comment
                            };
                        })
                    }
                }
            });
            return res.status(201).json({
                message: 'Invoice created',
                data: invoice
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.newInvoice = newInvoice;
function updateInvoice(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedInvoice = yield client_1.default.invoice.update({
                where: {
                    id: id
                },
                data: {
                    id: data.id,
                    amount: data.amount,
                    paid: data.paid,
                    dueDate: data.dueDate,
                    orgNumber: data.orgNumber,
                }
            });
            return res.status(200).json({
                message: "Invoice updated",
                data: updatedInvoice
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.updateInvoice = updateInvoice;
function deleteInvoice(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const invoice = yield client_1.default.invoice.delete({
                where: {
                    id: id
                }
            });
            return res.status(200).json({
                message: "Invoice deleted",
                data: invoice
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.deleteInvoice = deleteInvoice;
