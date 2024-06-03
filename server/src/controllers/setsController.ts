import {v4 as uuidv4} from "uuid";
import TermSetDto from "../../../shared/src/@types/api/TermSetDto";
import {getCountBySetId} from "./termsController";
import TermsSet from "../@types/domain/TermsSet";

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

export function getAll() {
    return termsSets.map(x => {
        x.termsCount = getCountBySetId(x.id)
        return x;
    });
}

export function addSet(termSet: TermSetDto) {
    if (!termSet.id)
        termSet.id = uuidv4()
    termsSets.push(termSet);
    return termSet.id;
}

export function editSet(termSet: TermSetDto) {
    termsSets = termsSets.map(x => {
        if (x.id === termSet.id)
            x = termSet;

        return x;
    })
    return termSet.id;
}

export function removeSet(setId: string) {
    termsSets = termsSets.filter(x => x.id !== setId);
    return setId;
}