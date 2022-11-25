import prisma from "../utils/client";
import {Invoice} from "../types/invoice";
import {InvoiceLine} from "../types/invoiceLine";
import {NextFunction, Request, Response} from "express";
import {errorHandler} from "./errorHandler";

export async function getInvoices(req: Request, res: Response, next: NextFunction) {
    const invoices = prisma.invoice.findMany()
    return res.status(200).json({
        message: 'All invoices',
        data: invoices
    });
}

export async function getInvoice(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params;
        const invoice = await prisma.invoice.findUniqueOrThrow({
            where: {
                id: id
            },
            include: {
                contact: true,
                invoiceLines: true
            }
        })
        return res.status(200).json({
            message: "OK",
            data: invoice
        });
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}

export async function newInvoice(req: Request, res: Response, next: NextFunction) {
    try {
        const data: Invoice = req.body;
        const invoice = await prisma.invoice.create({
            data: {
                id: data.id,
                amount: data.amount,
                paid: data.paid,
                dueDate: data.dueDate,
                orgNumber: data.orgNumber,
                ourReferenceId: data.ourReferenceId,
                theirReferenceId: data.theirReferenceId,
                invoiceLines: {
                    create: data.invoiceLines.map((line: InvoiceLine) => {
                        return {
                            description: line.description,
                            quantity: line.quantity,
                            price: line.price,
                            discount: line.discount,
                            comment: line.comment
                        }
                    })
                }
            }
        });
        return res.status(201).json({
            message: 'Invoice created',
            data: invoice
        });
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}

export async function updateInvoice(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params
        const data: Invoice = req.body;
        const updatedInvoice = await prisma.invoice.update({
            where: {
                id: id
            },
            data: {
                id: data.id,
                amount: data.amount,
                paid: data.paid,
                dueDate: data.dueDate,
                orgNumber: data.orgNumber,
            }
        });
        return res.status(200).json({
            message: "Invoice updated",
            data: updatedInvoice
        })
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}

export async function deleteInvoice(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params;
        const invoice = await prisma.invoice.delete({
            where: {
                id: id
            }
        });
        return res.status(200).json({
            message: "Invoice deleted",
            data: invoice
        })
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}
