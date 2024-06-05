import mongoose, {HydratedDocument, Model, Schema, Types} from "mongoose";
import {TermsSetAccessDal} from "../@types/dal/TermsSetAccessDal";
import {TermsSetAccess} from "../@types/domain/TermsSet";

const accessSchema = new mongoose.Schema<TermsSetAccessDal>({
    userId: Schema.ObjectId,
    termsSetId: Schema.ObjectId,
    access: String
});

const model = mongoose.model<TermsSetAccessDal>("TermsSetAccess", accessSchema);
export default model;

export const toDomain = (dal: TermsSetAccessDal): TermsSetAccess => {
    return {
        id: dal._id.toString(),
        access: dal.access,
        userId: dal.userId.toString(),
        termsSetId: dal.termsSetId.toString()
    }
}

export const toDal = (termsSetAccess: TermsSetAccess): HydratedDocument<TermsSetAccessDal> => {
    return new model<TermsSetAccessDal>({
        _id: new Types.ObjectId(termsSetAccess.id),
        userId: new Types.ObjectId(termsSetAccess.userId),
        termsSetId: new Types.ObjectId(termsSetAccess.termsSetId),
        access: termsSetAccess.access
    });
}