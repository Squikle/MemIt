import express from "express";
import {authUser, registerUser, verifyToken} from "../controllers/authController";
import Token from "../@types/Token";

const router = express.Router();

router.post("/login", async (req, res, next) => {
    let loginResult = await authUser({...req.body});
    if (loginResult.isErr()) {
        return next(loginResult.error);
    }

    const tokenResponse: Token = {
        token: loginResult.value
    }
    res.json(tokenResponse);
});

router.post("/registration", async (req, res, next) => {
    let registerResult = await registerUser({...req.body});
    if (registerResult.isErr()) {
        return next(registerResult.error);
    }

    const tokenResponse: Token = {
        token: registerResult.value
    }
    res.json(tokenResponse);
});

router.post("/verifyToken", async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        res.sendStatus(403);

    try {
        await verifyToken(token!);
    } catch (e) {
        return next(e);
    }

    res.status(200);
});

export default router;