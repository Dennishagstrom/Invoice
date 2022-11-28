import prisma from "../utils/client";
import {ContactPerson} from "../lib/types/contactPerson";
import {Request, Response, NextFunction} from "express";
import {errorHandler} from "../utils/errorHandler";

export async function getContactPersons(req: Request, res: Response) {
    const contactPersons = await prisma.contactPerson.findMany();
    res.status(200).json({
        message: 'All contact persons',
        data: contactPersons
    });
}

export async function getContactPerson(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const contactPerson = await prisma.contactPerson.findUniqueOrThrow({
            where: {
                id: id
            },
            include: {
                contact: true,
            }
        })
        return res.status(200).json({
            message: "OK",
            data: contactPerson
        });
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}

export async function newContactPerson(req: Request, res: Response) {
    try {
        const data: ContactPerson = req.body;
        const contactPerson = await prisma.contactPerson.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                orgNumber: data.orgNumber
            },
            include: {
                contact: true
            }
        });
        return res.status(201).json({
            message: 'Contact person created',
            data: contactPerson
        });
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}

export async function updateContactPerson(req: Request, res: Response) {
    try {
        const {id} = req.params
        const data: ContactPerson = req.body;
        const updatedContactPerson = await prisma.contactPerson.update({
            where: {
                id: id
            },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                orgNumber: data.orgNumber
            }
        });
        return res.status(200).json({
            message: "Contact person updated",
            data: updatedContactPerson
        })
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}

export async function deleteContactPerson(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const contactPerson = await prisma.contactPerson.delete({
            where: {
                id: id
            }
        });
        return res.status(200).json({
            message: "Contact person deleted",
            data: contactPerson
        })
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}
