import Term from "../@types/domain/Term";
import TermModel, {toDal, toDomain} from "../models/term"

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
        setId: "1"
    },
];

export async function getBySetId(setId: string) {
    const dal = await TermModel.find({setId: setId});
    return dal && dal.map(x => toDomain(x));
}

export async function getById(termId: string) {
    const dal = await TermModel.findById(termId);
    return dal && toDomain(dal);
}

export async function getCountBySetId(setId: string) {
    return TermModel.countDocuments({setId: setId});
}

export async function addOrUpdateTerm(term: Term) {
    console.log(term);
    console.log(toDal(term));

    await TermModel.updateOne({_id: term.id}, toDal(term), {upsert: true});
    return term.id;
}

export async function removeTerm(termId: string) {
    await TermModel.findByIdAndDelete(termId);
    return termId;
}