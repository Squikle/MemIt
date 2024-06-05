import {Types} from "mongoose";
import AccessLevel from "@shared/@types/domain/AccessLevel";

export type TermsSetAccessDal = {
    _id: Types.ObjectId,
    userId: Types.ObjectId,
    termsSetId: Types.ObjectId,
    access: AccessLevel
}