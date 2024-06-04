import {Types} from "mongoose";

export type UserDal = {
    id: Types.ObjectId,
    email: string,
    password: string,
}