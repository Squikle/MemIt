import mongoose, {Types} from "mongoose";
import TermsSet from "../@types/domain/TermsSet";

type TermsSetModel = {
    id: Types.ObjectId,
    name: string
}

const termsSetSchema = new mongoose.Schema<TermsSetModel>({
    name: String,
});

export default mongoose.model<TermsSetModel>("TermsSet", termsSetSchema);

export const toDomain = (dal: TermsSetModel): TermsSet => {
    return {
        id: dal.id.toString(),
        name: dal.name
    }
}
export const toDal = (dal: TermsSet): TermsSetModel => {
    return {
        id: new Types.ObjectId(dal.id),
        name: dal.name
    }
}