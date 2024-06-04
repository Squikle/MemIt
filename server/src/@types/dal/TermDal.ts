import {Types} from "mongoose";

export type TermDal = {
    id: Types.ObjectId,
    expression?: string,
    expressionImage?: string,
    translation?: string,
    translationImage?: string,
    setId: Types.ObjectId
}