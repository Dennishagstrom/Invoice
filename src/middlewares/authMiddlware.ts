const jwt = require("jsonwebtoken");
import {NextFunction, Response, Request} from "express"


export async function authorization(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!verified) throw new Error("Unauthenticated");
        return next();
    } catch (e: any) {
        return res.status(401).json({
            message: e || "Unauthorized",
        });
    }
}
