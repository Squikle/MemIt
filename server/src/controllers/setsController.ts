import {getCountBySetId} from "./termsController";
import TermsSet from "../@types/domain/TermsSet";
import TermsSetModel, {toDal, toDomain} from "../models/termsSet"

let termsSets: TermsSet[] = [
    {
        id: "0",
        name: "first",
    },
    {
        id: "1",
        name: "second",
    },
    {
        id: "3",
        name: "third",
    },
];

export async function getAll() {
    const sets = await TermsSetModel.find();
    const promises = sets.map(async x => {
        const termsCount = await getCountBySetId(x.id); //todo: optimize with single grouping query
        return toDomain(x, termsCount);
    });
    return await Promise.all(promises);
}

export async function addSet(termsSet: TermsSet) {
    const dal = toDal(termsSet)
    await dal.save();
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