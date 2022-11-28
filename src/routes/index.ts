import express from 'express';
import {authorization} from "../middlewares/authMiddlware";
import {deleteUser, getUser, getUsers, updateUser} from "../controllers/userController";
import {isAdmin} from "../middlewares/isAdmin";
import {
    deleteCategory,
    findCategoryById,
    getCategories,
    newCategory,
    updateCategory
} from "../controllers/categoryController";
import {deleteInvoice, getInvoice, getInvoices, newInvoice, updateInvoice} from "../controllers/invoiceController";
import invoiceSchema from "../lib/schemas/invoice.schema";
import {
    deleteContactPerson,
    getContactPerson,
    getContactPersons,
    newContactPerson,
    updateContactPerson
} from "../controllers/contactPersonController";
import {deleteContact, findContactById, getContacts, newContact, updateContact} from "../controllers/contactController";
import validate from "../middlewares/validate";
import userSchema from "../lib/schemas/user.schema";
import {login, logout, protectedRoute, registerUser} from "../controllers/authController";
import {deleteProduct, getProduct, getProducts, newProduct, updateProduct} from "../controllers/productController";
import {deleteOffer, getOffer, getOffers, newOffer, updateOffer} from "../controllers/offerController";
import offerSchema from "../lib/schemas/offer.schema";
import contactPersonSchema from "../lib/schemas/contactPerson.schema";
import contactSchema from "../lib/schemas/contact.schema";
import categorySchema from "../lib/schemas/category.schema";
import productSchema from "../lib/schemas/product.schema";
import {seedDb} from "../../prisma/seed";

export const routes = express.Router();

// USER ROUTES
routes.use('/users', authorization);
routes.get('/users', getUsers);
routes.get('/users/:id', getUser);
routes.patch('/users/:id', isAdmin, validate(userSchema), updateUser);
routes.delete('/users/:id', isAdmin, deleteUser);

// CONTACT ROUTES
routes.use('/contacts', authorization);
routes.get('/contacts', getContacts);
routes.get('/contacts/:id', findContactById);
routes.post('/contacts', validate(contactSchema), newContact);
routes.patch('/contacts/:id', validate(contactSchema), updateContact);
routes.delete('/contacts/:id', deleteContact);

// CONTACT PERSON ROUTES
routes.use('/contactPersons', authorization);
routes.get('/contactpersons', getContactPersons);
routes.get('/contactpersons/:id', getContactPerson);
routes.post('/contactpersons', validate(contactPersonSchema), newContactPerson);
routes.patch('/contactpersons/:id', validate(contactPersonSchema), updateContactPerson);
routes.delete('/contactpersons/:id', deleteContactPerson);

// INVOICE ROUTES
routes.use('/invoices', authorization);
routes.get('/invoices', getInvoices);
routes.get('/invoices/:id', getInvoice);
routes.post('/invoices', validate(invoiceSchema), newInvoice);
routes.patch('/invoices/:id', validate(invoiceSchema), updateInvoice);
routes.delete('/invoices/:id', deleteInvoice);

// PRODUCT ROUTES
routes.use('/products', authorization);
routes.get('/products', getProducts);
routes.get('/products/:id', getProduct);
routes.post('/products', validate(productSchema), newProduct);
routes.patch('/products/:id', validate(productSchema), updateProduct);
routes.delete('/products/:id', deleteProduct);

// CATEGORY ROUTES
routes.use('/categories', authorization);
routes.get('/categories', getCategories);
routes.get('/categories/:id', findCategoryById);
routes.post('/categories', validate(categorySchema), isAdmin, newCategory);
routes.patch('/categories/:id', validate(categorySchema), isAdmin, updateCategory);
routes.delete('/categories/:id', isAdmin, deleteCategory);

// OFFER ROUTES
routes.use('/offers', authorization);
routes.get('/offers', getOffers);
routes.get('/offers/:id', getOffer);
routes.post('/offers', validate(offerSchema), newOffer);
routes.patch('/offers/:id', validate(offerSchema), updateOffer);
routes.delete('/offers/:id', deleteOffer);

// AUTH ROUTES
routes.post('/login', login);
routes.post('/logout', logout);
routes.post('/register', validate(userSchema), registerUser);

// SEED DATABASE
routes.get('/seed', seedDb);

// CHECK IF AUTHENTICATED
routes.get('/protected', authorization, protectedRoute);




