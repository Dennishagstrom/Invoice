import prisma from "../utils/client";
import {Offer} from "../lib/types/offer";
import {OfferLine} from "../lib/types/offerLine";
import {errorHandler} from "../utils/errorHandler";
import {Request, Response, NextFunction} from "express";

export async function getOffers(req: Request, res: Response) {
    const offers = await prisma.offer.findMany({
        include: {
            offerLines: true
        }
    });
    return res.status(200).json({
        message: 'All offers',
        data: offers
    });
}

export async function getOffer(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const offer = await prisma.offer.findUniqueOrThrow({
            where: {
                id: id
            },
            include: {
                offerLines: true
            }
        });
        return res.status(200).json({
            message: "OK",
            data: offer
        });
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}

export async function newOffer(req: Request, res: Response) {
    try {
        const data: Offer = req.body;
        const offer = await prisma.offer.create({
            data: {
                id: data.id,
                amount: data.amount,
                validUntil: data.validUntil,
                orgNumber: data.orgNumber,
                ourReferenceId: data.ourReferenceId,
                theirReferenceId: data.theirReferenceId,
                offerLines: {
                    create: data.offerLines.map((line: OfferLine) => {
                        return {
                            description: line.description,
                            quantity: line.quantity,
                            price: line.price,
                            discount: line.discount,
                            comment: line.comment,
                            productId: line.productId
                        }
                    })
                }
            },
            include: {
                offerLines: true
            }
        });
        return res.status(201).json({
            message: 'Offer created',
            data: offer
        });
    } catch (e: any) {
        console.log(e);
        return await errorHandler(res, e);
    }
}

export async function updateOffer(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const data: Offer = req.body;
        const offer = await prisma.offer.update({
            where: {
                id: id
            },
            data: {
                amount: data.amount,
                validUntil: data.validUntil,
                orgNumber: data.orgNumber,
                ourReferenceId: data.ourReferenceId,
                theirReferenceId: data.theirReferenceId,
                offerLines: {
                    create: data.offerLines.map((line: OfferLine) => {
                        return {
                            description: line.description,
                            quantity: line.quantity,
                            price: line.price,
                            discount: line.discount,
                            comment: line.comment,
                            productId: line.productId
                        }
                    })
                }
            }
        });
        return res.status(200).json({
            message: 'Offer updated',
            data: offer
        });
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}

export async function deleteOffer(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const offer = await prisma.offer.delete({
            where: {
                id: id
            }
        });
        return res.status(200).json({
            message: 'Offer deleted',
            data: offer
        });
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}