"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const offerLines_schema_1 = __importDefault(require("./offerLines.schema"));
exports.default = (0, yup_1.object)({
    id: (0, yup_1.string)().max(255),
    amount: (0, yup_1.number)(),
    validUntil: (0, yup_1.date)(),
    orgNumber: (0, yup_1.string)().max(255),
    ourReferenceId: (0, yup_1.string)().max(255),
    theirReferenceId: (0, yup_1.string)().max(255),
    offerLines: (0, yup_1.array)(offerLines_schema_1.default)
});
