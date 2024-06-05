import mongoose, {HydratedDocument, Schema, Types} from "mongoose";
import Term from "../@types/domain/Term";
import {TermDal} from "../@types/dal/TermDal";

const termSchema = new Schema<TermDal>({
    expression: String,
    expressionImage: String,
    translation: String,
    translationImage: String,
    setId: {
        type: Schema.ObjectId,
        required: false
    },
});

const model = mongoose.model<TermDal>("Term", termSchema);
export default model;

export const toDomain = (dal: TermDal): Term => {
    return new Term(
        dal._id.toString(),
        dal.setId.toString(),
        dal.expression,
        dal.expressionImage,
        dal.translation,
        dal.translationImage
    );
}
export const toDal = (term: Term): HydratedDocument<TermDal> => {
    return new model<TermDal>({
        _id: new Types.ObjectId(term.id),
        translation: term.translation,
        expression: term.expression,
        expressionImage: term.expressionImage,
        translationImage: term.translationImage,
        setId: new Types.ObjectId(term.setId)
    });
}