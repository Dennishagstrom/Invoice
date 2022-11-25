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
exports.registerUser = exports.protectedRoute = exports.logout = exports.login = void 0;
const client_1 = __importDefault(require("../utils/client"));
const jwt_1 = require("../utils/jwt");
const errorHandler_1 = require("./errorHandler");
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid').v4;
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = yield client_1.default.user.findUniqueOrThrow({
                where: {
                    email: email
                },
            });
            if (!user) {
                return res.status(401).json({
                    message: 'Wrong username or password',
                });
            }
            bcrypt.compare(password, user.password, function (_err, result) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (result) {
                        const jti = uuidv4();
                        const Token = yield (0, jwt_1.generateToken)(user, jti);
                        // Get string out of promise
                        let TokenString = yield Token;
                        // TokenString = await hashToken(TokenString);
                        // RESPONSE
                        return res.cookie("token", TokenString, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === "production",
                        })
                            .status(201)
                            .json({
                            message: 'User successfully logged in',
                            data: user,
                            Token: TokenString
                        });
                    }
                    else {
                        return res.status(401).json({
                            message: 'Wrong username or password',
                        });
                    }
                });
            });
        }
        catch (e) {
            console.log(e);
            return (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.login = login;
function logout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return res
            .clearCookie("token")
            .status(200)
            .json({
            message: 'User successfully logged out',
        });
    });
}
exports.logout = logout;
function protectedRoute(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.status(200).json({
            message: 'You are logged in',
        });
    });
}
exports.protectedRoute = protectedRoute;
function registerUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const hashedPassword = yield bcrypt.hash(data.password, 10);
            const user = yield client_1.default.user.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hashedPassword,
                    role: data.role
                }
            });
            return res.status(201).json({
                message: 'User successfully registered',
                data: user
            });
        }
        catch (e) {
            return (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.registerUser = registerUser;
