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
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const client_1 = __importDefault(require("../utils/client"));
const errorHandler_1 = require("../utils/errorHandler");
const bcrypt = require('bcrypt');
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield client_1.default.user.findMany();
        res.status(200).json({
            message: 'All users',
            data: users
        });
    });
}
exports.getUsers = getUsers;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield client_1.default.user.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: {
                    contacts: true
                }
            });
            return res.status(200).json({
                message: "OK",
                data: user
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.getUser = getUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = req.body;
            const hashedPassword = yield bcrypt.hash(data.password, 10);
            const updatedUser = yield client_1.default.user.update({
                where: {
                    id: id
                },
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hashedPassword,
                    role: data.role
                }
            });
            return res.status(200).json({
                message: "User updated",
                data: updatedUser
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deletedUser = yield client_1.default.user.delete({
                where: {
                    id: id
                }
            });
            return res.status(200).json({
                message: "User deleted",
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.deleteUser = deleteUser;
