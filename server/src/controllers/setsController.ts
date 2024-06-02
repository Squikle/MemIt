import TermSet from "@shared/@types/TermSet";
import {v4 as uuidv4} from "uuid";

let termsSets: TermSet[] = [
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
    return termsSets;
}

export function addSet(termSet: TermSet) {
    if (!termSet.id)
        termSet.id = uuidv4()
    termsSets.push(termSet);
    return termSet.id;
}

export function editSet(termSet: TermSet) {
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