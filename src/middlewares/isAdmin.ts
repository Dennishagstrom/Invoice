import prisma from "../utils/client";

const jwt = require("jsonwebtoken");
const express = require("express");
const cookieParser = require("cookie-parser");
import {NextFunction, Response, Request} from "express"


export async function isAdmin(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: verified.userId,
            }
        });
        if (!verified || user.role !== "ADMIN") throw new Error("Unauthenticated");
        return next();
    } catch (e: any) {
        return res.status(401).json({
            message: "You do not have permission to do this action",
        });
    }
}