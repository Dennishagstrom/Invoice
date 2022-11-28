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
exports.deleteCategory = exports.updateCategory = exports.newCategory = exports.findCategoryById = exports.getCategories = void 0;
const client_1 = __importDefault(require("../utils/client"));
const errorHandler_1 = require("../utils/errorHandler");
function getCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield client_1.default.category.findMany();
        res.status(200).json({
            message: 'All categories',
            data: categories
        });
    });
}
exports.getCategories = getCategories;
function findCategoryById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const category = yield client_1.default.category.findUnique({
                where: {
                    id: id
                },
                include: {
                    products: true
                }
            });
            return res.status(200).json({
                message: "OK",
                data: category
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.findCategoryById = findCategoryById;
function newCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        try {
            const category = yield client_1.default.category.create({
                data: {
                    name: req.body.name,
                    note: req.body.note,
                    products: {
                        connect: data.products.map((product) => {
                            return { id: product.id };
                        })
                    }
                },
                include: {
                    products: true
                }
            });
            res.status(201).json({
                message: 'Category created',
                data: category
            });
        }
        catch (e) {
            console.log(e);
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.newCategory = newCategory;
function updateCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const updatedCategory = yield client_1.default.category.update({
                where: {
                    id: id
                },
                data: {
                    name: req.body.name,
                    note: req.body.note
                }
            });
            return res.status(200).json({
                message: "Category updated",
                data: updatedCategory
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.updateCategory = updateCategory;
function deleteCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deletedCategory = yield client_1.default.category.delete({
                where: {
                    id: id
                }
            });
            return res.status(200).json({
                message: "Category deleted",
                data: deletedCategory
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.deleteCategory = deleteCategory;
