import mongoose, {Types, HydratedDocument} from "mongoose";
import User from "../@types/domain/User";
import {UserDal} from "../@types/dal/UserDal";

const userSchema = new mongoose.Schema<UserDal>({
    email: String,
    password: String,
});

const model = mongoose.model<UserDal>("User", userSchema);
export default model;

export const toDomain = (dal: UserDal): User => {
    return new User(dal.email, dal.password);
}
export const toDal = (user: User): HydratedDocument<UserDal> => {
    return new model<UserDal>({
        _id: new Types.ObjectId(user.id),
        email: user.email,
        password: user.password
    })
}