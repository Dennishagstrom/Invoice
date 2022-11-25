import {Category} from "../types/category";
import prisma from "../utils/client";
import {Product} from "../types/product";
import {errorHandler} from "./errorHandler";
import {Request, Response, NextFunction} from "express";

export async function newCategory(req: Request, res: Response, next: NextFunction) {
    const data: Category = req.body;
    try {
        const category = await prisma.category.create({
            data: {
                name: req.body.name,
                note: req.body.note,
                products: {
                    connect: data.products.map((product: Product) => {
                        return {id: product.id}
                    })
                }
            },
            include: {
                products: true
            }
        });
        res.status(201).json({
            message: 'Category created',
            data: category
        });
    } catch (e: any) {
        console.log(e);
        return await errorHandler(res, e);
    }
}

export async function getCategories(req: Request, res: Response, next: NextFunction) {
    const categories = await prisma.category.findMany();
    res.status(200).json({
        message: 'All categories',
        data: categories
    });
}

export async function findCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params;
        const category = await prisma.category.findUnique({
            where: {
                id: id
            },
            include: {
                products: true
            }
        });
        return res.status(200).json({
            message: "OK",
            data: category
        });
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}

export async function updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params
        const updatedCategory = await prisma.category.update({
            where: {
                id: id
            },
            data: {
                name: req.body.name,
                note: req.body.note
            }
        });
        return res.status(200).json({
            message: "Category updated",
            data: updatedCategory
        })
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}

export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params
        const deletedCategory = await prisma.category.delete({
            where: {
                id: id
            }
        });
        return res.status(200).json({
            message: "Category deleted",
            data: deletedCategory
        })
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}