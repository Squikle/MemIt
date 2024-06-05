import {Types} from "mongoose";

export type UserDal = {
    _id: Types.ObjectId,
    email: string,
    password: string,
}