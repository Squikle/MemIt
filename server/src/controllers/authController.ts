import jwt from "jsonwebtoken";
import {err, ok, Result} from "neverthrow";
import UserModel, { toDal } from "../models/user"
import User from "../@types/domain/User";
import {UserError} from "../@types/UserError";
import TokenPayload from "../@types/domain/TokenPayload";

export async function authUser(email: string, password: string) {
    const userModel = await UserModel.findOne({email: email});
    const errorMessage = `User doesn't exist or the password is incorrect`;
    if (!userModel) {
        return err(new UserError(errorMessage, 400));
    }

    const user = User.fromExisting(userModel.id, email, password);
    if (user.password !== userModel.password) {
        return err(new UserError(errorMessage, 400));
    }

    let token = await getToken(user.email, user.id);
    return ok(token);
}

export async function registerUser(user: User): Promise<Result<string, UserError>> {
    let authUser = await UserModel.findOne({email: user.email});
    if (authUser)
        return err( new UserError(`Email ${user.email} is already taken!`, 400));

    const userModel = toDal(user);
    await userModel.save()

    try {
        const token = await getToken(userModel.email, userModel.id);
        return ok(token);
    } catch (e) {
        return err(new UserError(`Couldn't generate a token`, 500));
    }
}

export async function verifyToken(token: string): Promise<TokenPayload> {
    return new Promise((res, rej) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, decoded) => {
            if (err)
                return rej(err);

            return res(decoded as TokenPayload);
        });
    });
}

function getToken(email: string, userId: string): Promise<string> {
    return new Promise((res, rej) => {
        const payload = new TokenPayload(userId, email);
        const asPlainObject = {...payload}
        jwt.sign(asPlainObject, process.env.JWT_SECRET_KEY!, (err: any, encoded: any) => {
            if (err)
                return rej(err);

            return res(encoded as string);
        });
    });
}