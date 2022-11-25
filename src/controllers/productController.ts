import prisma from "../utils/client";
import {Product} from "../types/product";
import {Request, Response, NextFunction} from 'express';
import {errorHandler} from "./errorHandler";

export async function getProducts(req: Request, res: Response, next: NextFunction) {
    const products = await prisma.products.findMany();
    res.status(200).json({
        message: 'All products',
        data: products
    });
}

export async function getProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params;
        const product = await prisma.products.findUniqueOrThrow({
            where: {
                id: id
            }
        })
        return res.status(200).json({
            message: "OK",
            data: product
        });
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}

export async function newProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const data: Product = req.body;
        const product = await prisma.products.create({
            data: {
                id: data.id,
                name: data.name,
                unitPrice: data.unitPrice,
                note: data.note,
                active: data.active,
                categoryId: data.categoryId
            },
            include: {
                category: true
            }
        });
        return res.status(201).json({
            message: 'Product created',
            data: product
        });
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}

export async function updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params
        const data: Product = req.body;
        const updatedProduct = await prisma.products.update({
            where: {
                id: id
            },
            data: {
                id: data.id,
                name: data.name,
                unitPrice: data.unitPrice,
                note: data.note,
                active: data.active,
                categoryId: data.categoryId
            },
            include: {
                category: true
            }
        });
        return res.status(200).json({
            message: "Product updated",
            data: updatedProduct
        })
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}

export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params;
        const deletedProduct = await prisma.products.delete({
            where: {
                id: id
            }
        });
        return res.status(200).json({
            message: "Product deleted",
            data: deletedProduct
        });
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}