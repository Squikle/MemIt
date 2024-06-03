import jwt from "jsonwebtoken";
import {err, ok, Result} from "neverthrow";
import UserModel, { toDal } from "../models/user"
import User from "../@types/domain/User";
import {UserError} from "../@types/domain/UserError";

export async function authUser(user: User) {
    const userModel = await UserModel.findOne({email: user.email});
    const errorMessage = `User doesn't exist or the password is incorrect`;

    if (!userModel) {
        return err(new UserError(errorMessage, 400));
    }

    if (user.password !== userModel.password) {
        return err(new UserError(errorMessage, 400));
    }

    let token = await getToken(user.email);
    return ok(token);
}

export async function registerUser(user: User): Promise<Result<string, UserError>> {
    let authUser = await UserModel.findOne({email: user.email});
    if (authUser)
        return err( new UserError(`Email ${user.email} is already taken!`, 400));

    const userModel = toDal(user);
    await userModel.save()

    try {
        let token = await getToken(userModel.email);
        return ok(token);
    } catch (e) {
        return err(new UserError(`Couldn't generate a token`, 500));
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

function getToken(email: string) {
    return new Promise<string>((res, rej) => {
        jwt.sign({ email: email }, process.env.JWT_SECRET_KEY!, (err: any, encoded: any) => {
            if (err)
                return rej(err);

            return res(encoded);
        });
    });
}