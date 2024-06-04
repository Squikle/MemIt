import e, {ErrorRequestHandler} from "express";
import Error from "../../../shared/src/@types/dto/ErrorDto";
import {UserError} from "../@types/UserError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }

    if (err instanceof UserError) {
        const error: Error = {
            message: err.message,
            status: err.statusCode
        };
        res.status(err.statusCode).json(error);
    }
}