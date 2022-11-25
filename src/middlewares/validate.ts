// import yup
import {AnySchema, object} from 'yup'
import {Request, Response, NextFunction} from "express";

const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = await schema.validate(req.body, {
            stripUnknown: true,
            abortEarly: false
        });
        return next();
    } catch (error: any) {
        return res.status(400).json({
            message: error.message,
            error: error.errors
        });
    }
}

export default validate;