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
exports.deleteOffer = exports.updateOffer = exports.newOffer = exports.getOffer = exports.getOffers = void 0;
const client_1 = __importDefault(require("../utils/client"));
const errorHandler_1 = require("../utils/errorHandler");
function getOffers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const offers = yield client_1.default.offer.findMany({
            include: {
                offerLines: true
            }
        });
        return res.status(200).json({
            message: 'All offers',
            data: offers
        });
    });
}
exports.getOffers = getOffers;
function getOffer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const offer = yield client_1.default.offer.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: {
                    offerLines: true
                }
            });
            return res.status(200).json({
                message: "OK",
                data: offer
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.getOffer = getOffer;
function newOffer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const offer = yield client_1.default.offer.create({
                data: {
                    id: data.id,
                    amount: data.amount,
                    validUntil: data.validUntil,
                    orgNumber: data.orgNumber,
                    ourReferenceId: data.ourReferenceId,
                    theirReferenceId: data.theirReferenceId,
                    offerLines: {
                        create: data.offerLines.map((line) => {
                            return {
                                description: line.description,
                                quantity: line.quantity,
                                price: line.price,
                                discount: line.discount,
                                comment: line.comment,
                                productId: line.productId
                            };
                        })
                    }
                },
                include: {
                    offerLines: true
                }
            });
            return res.status(201).json({
                message: 'Offer created',
                data: offer
            });
        }
        catch (e) {
            console.log(e);
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.newOffer = newOffer;
function updateOffer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = req.body;
            const offer = yield client_1.default.offer.update({
                where: {
                    id: id
                },
                data: {
                    amount: data.amount,
                    validUntil: data.validUntil,
                    orgNumber: data.orgNumber,
                    ourReferenceId: data.ourReferenceId,
                    theirReferenceId: data.theirReferenceId,
                    offerLines: {
                        create: data.offerLines.map((line) => {
                            return {
                                description: line.description,
                                quantity: line.quantity,
                                price: line.price,
                                discount: line.discount,
                                comment: line.comment,
                                productId: line.productId
                            };
                        })
                    }
                }
            });
            return res.status(200).json({
                message: 'Offer updated',
                data: offer
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.updateOffer = updateOffer;
function deleteOffer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const offer = yield client_1.default.offer.delete({
                where: {
                    id: id
                }
            });
            return res.status(200).json({
                message: 'Offer deleted',
                data: offer
            });
        }
        catch (e) {
            return yield (0, errorHandler_1.errorHandler)(res, e);
        }
    });
}
exports.deleteOffer = deleteOffer;
