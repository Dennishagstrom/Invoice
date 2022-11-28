import prisma from "../utils/client";
import {generateToken} from "../utils/jwt";
import {errorHandler} from "../utils/errorHandler";
import {Request, Response, NextFunction} from "express";
import {NotFoundError} from "@prisma/client/runtime";

const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;

const bcrypt = require('bcrypt');
const uuidv4 = require('uuid').v4;

export async function login(req: Request, res: Response) {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user: any = await prisma.user.findUniqueOrThrow({
            where: {
                email: email
            },
        });

        if (!user) {
            return res.status(401).json({
                message: 'Wrong username or password',
            });
        }


        bcrypt.compare(
            password,
            user.password,
            async function (_err: any, result: boolean) {
                if (result) {
                    const jti = uuidv4();
                    const Token = await generateToken(user, jti);

                    // Get string out of promise
                    let TokenString = await Token;
                    // TokenString = await hashToken(TokenString);

                    // RESPONSE
                    return res.cookie("token", TokenString, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                    })
                        .status(201)
                        .json({
                            message: 'User successfully logged in',
                            data: user,
                            Token: TokenString
                        });
                } else {
                    return res.status(401).json({
                        message: 'Wrong username or password',
                    });
                }
            });

    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(401).json({
                message: 'Wrong username or password',
            });
        }
        return errorHandler(res, e);
    }
}

export async function logout(req: Request, res: Response) {
    return res
        .clearCookie("token")
        .status(200)
        .json({
            message: 'User successfully logged out',
        });
}

export async function protectedRoute(req: Request, res: Response) {
    return res.status(200).json({
        message: 'You are logged in',
    });
}

export async function registerUser(req: Request, res: Response) {
    try {
        const data = req.body;
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedPassword,
                role: data.role
            }
        });

        return res.status(201).json({
            message: 'User successfully registered',
            data: user
        });
    } catch (e) {
        return errorHandler(res, e);
    }
}

