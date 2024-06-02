import User from "../@types/User";
import jwt from "jsonwebtoken";
import { createHash } from "node:crypto";
import {UserError} from "../models/UserError";
import {err, ok, Result} from "neverthrow";

const users: User[] = [
    {
        email: "test@test.com",
        password: "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
    },
];

export async function authUser(user: User) {
    let authUser = users.find(x => x.email === user.email);
    const errorMessage = `User doesn't exist or the password is incorrect`;

    if (!authUser) {
        return err(new UserError(errorMessage, 400));
    }

    const hashedPassword = hashPassword(user.password);
    if (hashedPassword !== authUser.password) {
        return err(new UserError(errorMessage, 400));
    }

    let token = await getToken(user.email);
    return ok(token);
}

export async function registerUser(user: User): Promise<Result<string, UserError>> {
    let authUser = users.find(x => x.email === user.email);
    if (authUser)
        return err( new UserError(`Email ${user.email} is already taken!`, 400));

    users.push({
        email: user.email,
        password: hashPassword(user.password)
    });

    try {
        let token = await getToken(user.email);
        return ok(token);
    } catch (e) {
        return err( new UserError(`Couldn't generate a token`, 500));
    }
}

export async function verifyToken(token: string) {
    return new Promise((res, rej) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, decoded) => {
            if (err)
                return rej(err);

            return res(decoded);
        });
    });
}

function hashPassword(password: string) {
    return createHash("sha256").update(password).digest("hex");
}

function getToken(email: string) {
    return new Promise<string>((res, rej) => {
        jwt.sign({ email: email }, process.env.JWT_SECRET_KEY!, (err: any, encoded: any) => {
            if (err)
                return rej(err);

            return res(encoded);
        });
    });
}