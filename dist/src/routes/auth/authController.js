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
exports.revokeTokens = exports.deleteRefreshToken = exports.findRefreshTokenById = exports.addRefreshTokenToWhitelist = void 0;
const client_1 = __importDefault(require("../../utils/client"));
const { hashToken } = require('../../utils/hashToken');
// used when we create a refresh token.
function addRefreshTokenToWhitelist(refreshToken, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = user.id;
        return client_1.default.refreshToken.create({
            data: {
                hashedToken: hashToken(refreshToken),
                userId
            },
        });
    });
}
exports.addRefreshTokenToWhitelist = addRefreshTokenToWhitelist;
// used to check if the token sent by the client is in the database.
function findRefreshTokenById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return client_1.default.refreshToken.findUnique({
            where: {
                id,
            },
        });
    });
}
exports.findRefreshTokenById = findRefreshTokenById;
// soft delete tokens after usage.
function deleteRefreshToken(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return client_1.default.refreshToken.update({
            where: {
                id,
            },
            data: {
                revoked: true
            }
        });
    });
}
exports.deleteRefreshToken = deleteRefreshToken;
function revokeTokens(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return client_1.default.refreshToken.updateMany({
            where: {
                userId
            },
            data: {
                revoked: true
            }
        });
    });
}
exports.revokeTokens = revokeTokens;
