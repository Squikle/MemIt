import {getCountBySetId} from "./termsController";
import TermsSet from "../@types/domain/TermsSet";
import TermsSetModel, {toDal, toDomain} from "../models/termsSet"
import TermsSetAccess, { toDal as toAccessDal, toDomain as toAccessDomain } from "../models/termsSetAccess"

export async function getAll() {
    const sets = await TermsSetModel.find();
    const promises = sets.map(async x => {
        const termsCount = await getCountBySetId(x.id); //todo: optimize with single grouping query
        const access = await TermsSetAccess.find({termsSetId: x.id});
        const domainAccess = access.map(x => toAccessDomain(x));
        return toDomain(x, domainAccess, termsCount);
    });
    return await Promise.all(promises);
}

export async function addSet(termsSet: TermsSet) {
    const dal = toDal(termsSet)
    await dal.save();

    const access = termsSet.access.map(x => toAccessDal(x));
    await TermsSetAccess.insertMany(access);
    return dal.id;
}

export async function editSet(termSet: TermsSet) {
    await TermsSetModel.findByIdAndUpdate(termSet.id, toDal(termSet));
    return termSet.id;
}

export async function removeSet(setId: string) {
    await TermsSetModel.findByIdAndDelete(setId);
    return setId;
}