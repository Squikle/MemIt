import express from "express";
import {authUser, registerUser, verifyToken} from "../../controllers/authController";
import TokenDto from "../../../../shared/src/@types/dto/TokenDto";
import {toDomain} from "./convertor";

const router = express.Router();

router.post("/login", async (req, res, next) => {
    const userData = req.body as any as {email: string, password: string};
    let loginResult = await authUser(userData.email, userData.password);
    if (loginResult.isErr()) {
        return next(loginResult.error);
    }

    const tokenResponse: TokenDto = {
        token: loginResult.value
    }
    res.json(tokenResponse);
});

router.post("/registration", async (req, res, next) => {
    let registerResult = await registerUser(toDomain(req.body));
    if (registerResult.isErr()) {
        return next(registerResult.error);
    }

    const tokenResponse: TokenDto = {
        token: registerResult.value
    }
    res.json(tokenResponse);
});

router.post("/verify", async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        res.sendStatus(403);

    try {
        await verifyToken(token!);
    } catch (e) {
        return next(e);
    }

    res.sendStatus(200);
});

export default router;