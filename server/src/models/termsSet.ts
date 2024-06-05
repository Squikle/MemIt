import mongoose, {HydratedDocument, Schema, Types, Model} from "mongoose";
import TermsSet, {TermsSetAccess} from "../@types/domain/TermsSet";
import {TermsSetDal} from "../@types/dal/TermsSetDal";

const termsSetSchema = new mongoose.Schema<TermsSetDal>({
    name: String
});

const model = mongoose.model<TermsSetDal, Model<TermsSetDal>>("TermsSet", termsSetSchema);
export default model;

export const toDomain = (dal: TermsSetDal, access: TermsSetAccess[], termsCount?: number): TermsSet => {
    return TermsSet.createFromExisting(dal._id.toString(), dal.name, termsCount || 0, access);
}

export const toDal = (termsSet: TermsSet): HydratedDocument<TermsSetDal> => {
    return new model<TermsSetDal>({
        _id: new Types.ObjectId(termsSet.id),
        name: termsSet.name
    });
}