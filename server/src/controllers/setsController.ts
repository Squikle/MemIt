import {getCountBySetId} from "./termsController";
import TermsSet from "../@types/domain/TermsSet";
import TermsSetModel, {toDal, toDomain} from "../models/termsSet"
import TermsSetAccess, { toDal as toAccessDal, toDomain as toAccessDomain } from "../models/termsSetAccess"
import {toObjectId} from "../../../shared/src/utils";

export async function getByUser(userId: string) {
    const userPermissions = await TermsSetAccess.find({userId: toObjectId(userId)});
    const sets = await TermsSetModel.find({
        _id: {
            $in: userPermissions.map(x => x.termsSetId)
        }
    });
    const promises = sets.map(async x => {
        const termsCount = await getCountBySetId(x.id); //todo: optimize with single grouping query
        const userPermission = userPermissions
            .filter(x => x.userId.toString() === userId)
            .find(a => a.termsSetId.toString() === x.id)!;
        const domainPermission = toAccessDomain(userPermission);
        return toDomain(x, [domainPermission], termsCount);
    });
    return Promise.all(promises);
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