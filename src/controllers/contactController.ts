import prisma from "../utils/client";
import {Contact} from "../lib/types/contact";
import {Request, Response, NextFunction} from "express";
import {errorHandler} from "../utils/errorHandler";
import {ContactPerson} from "../lib/types/contactPerson";


export async function getContacts(req: Request, res: Response) {
    const contacts = await prisma.contact.findMany();
    res.status(200).json({
        message: 'All contacts',
        data: contacts
    });
}

export async function findContactById(req: Request, res: Response) {
    interface ContactParams {
        includeContactPersons?: string
        includeContactOwner?: string
        includeInvoices?: string
    }

    const params: ContactParams = req.query;

    try {
        const {id} = req.params;
        const contact = await prisma.contact.findUnique({
            where: {
                orgNumber: id
            },
            include: {
                invoices: !!params.includeInvoices,
                contactOwner: !!params.includeContactOwner,
                contactPersons: !!params.includeContactPersons,
            }
        });
        return res.status(200).json({
            message: "OK",
            data: contact
        });
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}


export async function newContact(req: Request, res: Response) {
    try {
        const data: Contact = req.body;
        const newContact = await prisma.contact.create({
            data: {
                orgNumber: data.orgNumber,
                name: data.name,
                phone: data.phone,
                address: data.address,
                houseNumber: data.houseNumber,
                postalCode: data.postalCode,
                city: data.city,
                country: data.country,
                type: data.type,
                contactOwnerId: data.contactOwnerId,
                contactPersons: {
                    create: data.contactPersons.map((contactPerson: ContactPerson) => {
                        return {
                            firstName: contactPerson.firstName,
                            lastName: contactPerson.lastName,
                            phone: contactPerson.phone,
                            email: contactPerson.email,
                        }
                    })
                }
            }
        });

        return res.status(201).json({
            message: 'Contact created',
            data: newContact
        });
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}


export async function updateContact(req: Request, res: Response) {
    console.log(req.body);
    try {
        const {id} = req.params
        const data: Contact = req.body;
        const updatedContact = await prisma.contact.update({
            where: {
                orgNumber: id
            },
            data: {
                orgNumber: data.orgNumber,
                name: data.name,
                phone: data.phone,
                address: data.address,
                houseNumber: data.houseNumber,
                postalCode: data.postalCode,
                city: data.city,
                country: data.country,
                type: data.type,
                contactOwnerId: data.contactOwnerId,
            }
        });
        return res.status(200).json({
            message: "Contact updated",
            data: updatedContact
        })
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}

export async function deleteContact(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const deletedContact = await prisma.contact.delete({
            where: {
                orgNumber: id
            }
        });
        return res.status(200).json({
            message: "Contact deleted",
            data: deletedContact
        })
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}
