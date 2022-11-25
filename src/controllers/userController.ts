import prisma from "../utils/client";
import {User} from "../types/user";
import {NextFunction, Request, Response} from "express";
import {errorHandler} from "./errorHandler";

const bcrypt = require('bcrypt');

export async function getUsers(req: Request, res: Response, next: NextFunction) {
    const users = await prisma.user.findMany();
    res.status(200).json({
        message: 'All users',
        data: users
    });
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params;
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: id
            },
            include: {
                contacts: true
            }
        });
        return res.status(200).json({
            message: "OK",
            data: user
        });
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params
        const data: User = req.body;
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedPassword,
                role: data.role
            }
        });
        return res.status(200).json({
            message: "User updated",
            data: updatedUser
        })
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params
        const deletedUser = await prisma.user.delete({
            where: {
                id: id
            }
        })
        return res.status(200).json({
            message: "User deleted",
        })
    } catch (e: any) {
        return await errorHandler(res, e);
    }
}