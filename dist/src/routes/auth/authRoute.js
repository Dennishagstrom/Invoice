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
exports.authRoute = void 0;
const express_1 = require("express");
const client_1 = __importDefault(require("../../utils/client"));
const errorHandler_1 = require("../../controllers/errorHandler");
const userController_1 = require("../../controllers/userController");
const jwt_1 = require("../../utils/jwt");
const authMiddlware_1 = require("../../middlewares/authMiddlware");
const validate_1 = __importDefault(require("../../middlewares/validate"));
const user_schema_1 = __importDefault(require("../../lib/schemas/user.schema"));
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = process.env.TOKEN_SECRET;
exports.authRoute = (0, express_1.Router)();
// USER LOGIN
exports.authRoute.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
// LOGOUT
exports.authRoute.post('/logout', authMiddlware_1.authorization, (req, res) => {
    return res
        .clearCookie("token")
        .status(200)
        .json({
        message: 'User successfully logged out',
    });
});
// PROTECTED
exports.authRoute.get('/protected', authMiddlware_1.authorization, (req, res) => {
    res.send("You are logged in");
});
// USER REGISTRATION
exports.authRoute.post('/register', (0, validate_1.default)(user_schema_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield (0, userController_1.registerUser)(req.body);
        // RESPONSE
        return res.status(201)
            .json({
            message: 'User created',
            data: newUser,
        });
    }
    catch (e) {
        console.log(e);
        return yield (0, errorHandler_1.errorHandler)(res, e);
    }
}));
