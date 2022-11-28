import {Response} from "express";
import {NotFoundError} from "@prisma/client/runtime";

export async function errorHandler(res: Response, e: any) {
    if (e.code === 'P2002') {
        return res.status(400).json({
            message: 'Already exists.'
        })
    }
    if (e.code === 'P2003') {
        return res.status(404).json({
            message: 'Not found'
        })
    }
    if (e.code === 'P2025') {
        return res.status(400).json({
            message: 'Cant find what your are looking for'
        })
    }
    if (e instanceof NotFoundError) {
        return res.status(404).json({
            message: 'Could not be found'
        })
    }
    return res.status(500).json({
        message: 'HER SKJEDDE DET NOE FEIL'
    })
}

