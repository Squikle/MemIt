import User from "../@types/user";
import jwt from "jsonwebtoken";
import { createHash } from "node:crypto";

const users: User[] = [
    {
        email: "test@test.com",
        password: "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
    },
];

export function authUser(user: User) {
    let authUser = users.find(x => x.email === user.email);
    if (!authUser) {
        return null;
    }

    const hashedPassword = hashPassword(user.password);
    if (hashedPassword === authUser.password) {
        return getToken(user.email);
    }

    return null;
}

export function registerUser(user: User) {
    let authUser = users.find(x => x.email === user.email);
    if (authUser)
        throw new Error(`Email ${user.email} is already taken!`)

    users.push({
        email: user.email,
        password: hashPassword(user.password)
    });
    return getToken(user.email);
}

export async function verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY!);
}

function hashPassword(password: string) {
    return createHash("sha256").update(password).digest("hex");
}

function getToken(email: string) {
    return jwt.sign({ email: email }, process.env.JWT_SECRET_KEY!);
}