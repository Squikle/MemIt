import e, {ErrorRequestHandler} from "express";
import {UserError} from "../models/UserError";
import Error from "../@types/Error";

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