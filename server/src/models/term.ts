import mongoose, {Schema, Types} from "mongoose";
import Term from "../@types/domain/Term";

type TermModel = {
    id: Types.ObjectId,
    expression?: string,
    expressionImage?: string,
    translation?: string,
    translationImage?: string,
    setId: Types.ObjectId
}

const termSchema = new Schema<TermModel>({
    expression: String,
    expressionImage: String,
    translation: String,
    translationImage: String,
    setId: {
        type: Schema.ObjectId,
        required: false
    },
});

export default mongoose.model<TermModel>("Term", termSchema);

export const toDomain = (dal: TermModel): Term => {
    return {
        id: dal.id.toString(),
        setId: dal.setId.toString(),
        translationImage: dal.translationImage,
        expressionImage: dal.expressionImage,
        expression: dal.expression,
        translation: dal.translation
    }
}
export const toDal = (dal: Term): TermModel => {
    return {
        id: new Types.ObjectId(dal.id),
        translation: dal.translation,
        expression: dal.expression,
        expressionImage: dal.expressionImage,
        translationImage: dal.translationImage,
        setId: new Types.ObjectId(dal.setId)
    }
}