import Term from "@shared/@types/Term";
import { v4 as uuidv4 } from "uuid";

let terms: Term[] = [
    {
        id: "0",
        expression: "term1",
        translation: "переклад1",
        setId: "0"
    },
    {
        id: "1",
        expression: "term2",
        translation: "переклад2",
        setId: "0",
    },
    {
        id: "2",
        expression: "term2",
        translation: "переклад2",
        setId: "0",
    },
    {
        id: "3",
        expression: "term2",
        translation: "переклад2",
        setId: "0",
    },
    {
        id: "4",
        expression:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et.",
        translation: "переклад2",
        setId: "0",
    },
    {
        id: "5",
        expression:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et.",
        translation:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et. Voluptatem provident, reiciendis odio sapiente eveniet dolore architecto illum voluptas reprehenderit minima velit, aliquid, voluptates expedita. Rerum et.",
        setId: "0",
    },
    {
        id: "6",
        translation: "train",
        setId: "0",
    },
    {
        id: "7",
        expression: "1",
        translation: "one",
        setId: "1",
    },
    {
        id: "8",
        expression: "2",
        translation: "two",
        setId: "1",
    },
    {
        id: "9",
        expression: "3",
        translation: "three",
        setId: "1",
    },
];

export function getBySetId(setId: string) {
    return terms.filter(x => x.setId === setId);
}

export function getById(termId: string) {
    return terms.find(x => x.id === termId);
}

export function addTerm(term: Term) {
    if (!term.id)
        term.id = uuidv4()
    terms.push(term);
    return term.id;
}

export function editTerm(term: Term) {
    terms = terms.map(x => {
        if (x.id === term.id)
            return term;

        return x;
    })
    return term.id;
}

export function removeTerm(termId: string) {
    terms = terms.filter(x => x.id !== termId);
    return termId;
}