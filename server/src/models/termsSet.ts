import mongoose, {HydratedDocument, Types} from "mongoose";
import TermsSet from "../@types/domain/TermsSet";
import {TermsSetDal} from "../@types/dal/TermsSetDal";

const termsSetSchema = new mongoose.Schema<TermsSetDal>({
    name: String,
});

const model = mongoose.model<TermsSetDal>("TermsSet", termsSetSchema);
export default model;

export const toDomain = (dal: TermsSetDal, termsCount?: number): TermsSet => {
    return new TermsSet(dal.id.toString(), dal.name, termsCount || 0);
}
export const toDal = (termsSet: TermsSet): HydratedDocument<TermsSetDal> => {
    return new model({
        _id: new Types.ObjectId(termsSet.id),
        name: termsSet.name
    });
}