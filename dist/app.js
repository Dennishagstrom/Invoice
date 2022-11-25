"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./src/routes");
// SETUP
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const cookieParser = require('cookie-parser');
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cookieParser());
// ROUTES
app.use('/', routes_1.routes);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
