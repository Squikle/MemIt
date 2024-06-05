import {RequestHandler} from "express";
import {verifyToken} from "../controllers/authController";

export const requireAuth: RequestHandler = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        res.sendStatus(403);

    try {
        const decoded = await verifyToken(token!);
        req.userId = decoded.userId;
        next();
    } catch (e) {
        return next(e);
    }
}