"use strict";
// import {Request, Response} from 'express';
//
// const jwt = require('jsonwebtoken');
//
// export async function isAuthenticated(req: Request, res: Response) {
//     const {authorization} = req.headers;
//
//     if (!authorization) {
//         res.status(401).json({
//             message: 'No authorization header',
//         });
//     }
//     const token = authorization.split(' ')[1];
//
//     try {
//         const token = authorization.split(' ')[1];
//         const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
//         req.body.userId = payload.userId;
//     } catch (err: any) {
//         res.status(401).json({
//             message: 'Unauthorized',
//         });
//     }
// }
