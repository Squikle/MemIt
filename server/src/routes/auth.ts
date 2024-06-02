import express from "express";
import {authUser, registerUser} from "../controllers/authController";
import Token from "../@types/token";

const router = express.Router();

router.post("/api/auth/login", async (req, res) => {
    let token = authUser({...req.body});
    if (!token) {
        res.sendStatus(400);
        return;
    }

    const tokenResponse: Token = {
        token
    }
    res.json(tokenResponse);
});

router.post("/api/auth/registration", async (req, res) => {
    const tokenResponse: Token = {
        token: registerUser({...req.body})
    }
    res.json(tokenResponse);
});

export default router;