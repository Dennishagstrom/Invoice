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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const jwt = require("jsonwebtoken");
const express = require("express");
const cookieParser = require("cookie-parser");
function authorization(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            if (!verified)
                throw new Error("Unauthenticated");
            return next();
        }
        catch (e) {
            return res.status(401).json({
                message: e || "Unauthorized",
            });
        }
    });
}
exports.authorization = authorization;
