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
exports.isAdmin = void 0;
const client_1 = __importDefault(require("../utils/client"));
const jwt = require("jsonwebtoken");
const express = require("express");
const cookieParser = require("cookie-parser");
function isAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            const user = yield client_1.default.user.findUniqueOrThrow({
                where: {
                    id: verified.userId,
                }
            });
            if (!verified || user.role !== "ADMIN")
                throw new Error("Unauthenticated");
            return next();
        }
        catch (e) {
            return res.status(401).json({
                message: "You do not have permission to do this action",
            });
        }
    });
}
exports.isAdmin = isAdmin;
