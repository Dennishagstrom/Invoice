"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const authMiddlware_1 = require("../middlewares/authMiddlware");
const userController_1 = require("../controllers/userController");
const isAdmin_1 = require("../middlewares/isAdmin");
const categoryController_1 = require("../controllers/categoryController");
const invoiceController_1 = require("../controllers/invoiceController");
const invoice_schema_1 = __importDefault(require("../lib/schemas/invoice.schema"));
const contactPersonController_1 = require("../controllers/contactPersonController");
const contactController_1 = require("../controllers/contactController");
const validate_1 = __importDefault(require("../middlewares/validate"));
const user_schema_1 = __importDefault(require("../lib/schemas/user.schema"));
const authController_1 = require("../controllers/authController");
const productController_1 = require("../controllers/productController");
const offerController_1 = require("../controllers/offerController");
const offer_schema_1 = __importDefault(require("../lib/schemas/offer.schema"));
const contactPerson_schema_1 = __importDefault(require("../lib/schemas/contactPerson.schema"));
const contact_schema_1 = __importDefault(require("../lib/schemas/contact.schema"));
const category_schema_1 = __importDefault(require("../lib/schemas/category.schema"));
const product_schema_1 = __importDefault(require("../lib/schemas/product.schema"));
exports.routes = express_1.default.Router();
// USER ROUTES
exports.routes.use('/users', authMiddlware_1.authorization);
exports.routes.get('/users', userController_1.getUsers);
exports.routes.get('/users/:id', userController_1.getUser);
exports.routes.patch('/users/:id', isAdmin_1.isAdmin, (0, validate_1.default)(user_schema_1.default), userController_1.updateUser);
exports.routes.delete('/users/:id', isAdmin_1.isAdmin, userController_1.deleteUser);
// CONTACT ROUTES
exports.routes.use('/contacts', authMiddlware_1.authorization);
exports.routes.get('/contacts', contactController_1.getContacts);
exports.routes.get('/contacts/:id', contactController_1.findContactById);
exports.routes.post('/contacts', (0, validate_1.default)(contact_schema_1.default), contactController_1.newContact);
exports.routes.patch('/contacts/:id', (0, validate_1.default)(contact_schema_1.default), contactController_1.updateContact);
exports.routes.delete('/contacts/:id', contactController_1.deleteContact);
// CONTACT PERSON ROUTES
exports.routes.use('/contactPersons', authMiddlware_1.authorization);
exports.routes.get('/contactpersons', contactPersonController_1.getContactPersons);
exports.routes.get('/contactpersons/:id', contactPersonController_1.getContactPerson);
exports.routes.post('/contactpersons', (0, validate_1.default)(contactPerson_schema_1.default), contactPersonController_1.newContactPerson);
exports.routes.patch('/contactpersons/:id', (0, validate_1.default)(contactPerson_schema_1.default), contactPersonController_1.updateContactPerson);
exports.routes.delete('/contactpersons/:id', contactPersonController_1.deleteContactPerson);
// INVOICE ROUTES
exports.routes.use('/invoices', authMiddlware_1.authorization);
exports.routes.get('/invoices', invoiceController_1.getInvoices);
exports.routes.get('/invoices/:id', invoiceController_1.getInvoice);
exports.routes.post('/invoices', (0, validate_1.default)(invoice_schema_1.default), invoiceController_1.newInvoice);
exports.routes.patch('/invoices/:id', (0, validate_1.default)(invoice_schema_1.default), invoiceController_1.updateInvoice);
exports.routes.delete('/invoices/:id', invoiceController_1.deleteInvoice);
// PRODUCT ROUTES
exports.routes.use('/products', authMiddlware_1.authorization);
exports.routes.get('/products', productController_1.getProducts);
exports.routes.get('/products/:id', productController_1.getProduct);
exports.routes.post('/products', (0, validate_1.default)(product_schema_1.default), productController_1.newProduct);
exports.routes.patch('/products/:id', (0, validate_1.default)(product_schema_1.default), productController_1.updateProduct);
exports.routes.delete('/products/:id', productController_1.deleteProduct);
// CATEGORY ROUTES
exports.routes.use('/categories', authMiddlware_1.authorization);
exports.routes.get('/categories', categoryController_1.getCategories);
exports.routes.get('/categories/:id', categoryController_1.findCategoryById);
exports.routes.post('/categories', (0, validate_1.default)(category_schema_1.default), isAdmin_1.isAdmin, categoryController_1.newCategory);
exports.routes.patch('/categories/:id', (0, validate_1.default)(category_schema_1.default), isAdmin_1.isAdmin, categoryController_1.updateCategory);
exports.routes.delete('/categories/:id', isAdmin_1.isAdmin, categoryController_1.deleteCategory);
// OFFER ROUTES
exports.routes.use('/offers', authMiddlware_1.authorization);
exports.routes.get('/offers', offerController_1.getOffers);
exports.routes.get('/offers/:id', offerController_1.getOffer);
exports.routes.post('/offers', (0, validate_1.default)(offer_schema_1.default), offerController_1.newOffer);
exports.routes.patch('/offers/:id', (0, validate_1.default)(offer_schema_1.default), offerController_1.updateOffer);
exports.routes.delete('/offers/:id', offerController_1.deleteOffer);
// AUTH ROUTES
exports.routes.post('/login', authController_1.login);
exports.routes.post('/logout', authController_1.logout);
exports.routes.post('/register', (0, validate_1.default)(user_schema_1.default), authController_1.registerUser);
// CHECK IF AUTHENTICATED
exports.routes.get('/protected', authMiddlware_1.authorization, authController_1.protectedRoute);
