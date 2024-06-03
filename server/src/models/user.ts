import mongoose, {Types, HydratedDocument} from "mongoose";
import User from "../@types/domain/User";

type UserModel = {
    id: Types.ObjectId,
    email: string,
    password: string,
}

const userSchema = new mongoose.Schema<UserModel>({
    email: String,
    password: String,
});

const model = mongoose.model<UserModel>("User", userSchema);
export default model;

export const toDomain = (dal: UserModel): User => {
    return new User(dal.email, dal.password);
}
export const toDal = (dal: User): HydratedDocument<UserModel> => {
    return new model({
        id: new Types.ObjectId(dal.id),
        email: dal.email,
        password: dal.password
    })
}