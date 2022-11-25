"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const authMiddlware_1 = require("../middlewares/authMiddlware");
const isAdmin_1 = require("../middlewares/isAdmin");
exports.productRoute = (0, express_1.Router)();
exports.productRoute.get('/products', authMiddlware_1.authorization, productController_1.getProducts);
exports.productRoute.get('/products/:id', authMiddlware_1.authorization, productController_1.getProduct);
exports.productRoute.post('/products', authMiddlware_1.authorization, isAdmin_1.isAdmin, productController_1.newProduct);
exports.productRoute.patch('/products/:id', authMiddlware_1.authorization, isAdmin_1.isAdmin, productController_1.updateProduct);
exports.productRoute.delete('/products/:id', authMiddlware_1.authorization, isAdmin_1.isAdmin, productController_1.deleteProduct);