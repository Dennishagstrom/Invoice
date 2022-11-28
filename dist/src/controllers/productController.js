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
exports.deleteProduct = exports.updateProduct = exports.newProduct = exports.getProduct = exports.getProducts = void 0;
const client_1 = __importDefault(require("../utils/client"));
const errorHandler_1 = require("../utils/errorHandler");
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield client_1.default.products.findMany();
        res.status(200).json({
            message: 'All products',
            data: products
        });
    });
}
exports.getProducts = getProducts;
function getProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const product = yield client_1.default.products.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            return res.status(200).json({
                message: "OK",
                data: product
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.getProduct = getProduct;
function newProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const product = yield client_1.default.products.create({
                data: {
                    id: data.id,
                    name: data.name,
                    unitPrice: data.unitPrice,
                    note: data.note,
                    active: data.active,
                    categoryId: data.categoryId
                },
                include: {
                    category: true
                }
            });
            return res.status(201).json({
                message: 'Product created',
                data: product
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.newProduct = newProduct;
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedProduct = yield client_1.default.products.update({
                where: {
                    id: id
                },
                data: {
                    id: data.id,
                    name: data.name,
                    unitPrice: data.unitPrice,
                    note: data.note,
                    active: data.active,
                    categoryId: data.categoryId
                },
                include: {
                    category: true
                }
            });
            return res.status(200).json({
                message: "Product updated",
                data: updatedProduct
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.updateProduct = updateProduct;
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deletedProduct = yield client_1.default.products.delete({
                where: {
                    id: id
                }
            });
            return res.status(200).json({
                message: "Product deleted",
                data: deletedProduct
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.deleteProduct = deleteProduct;
