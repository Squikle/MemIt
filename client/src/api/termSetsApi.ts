import { host } from ".";
import Term from "@shared/@types/Term.ts";
import TermSet from "@shared/@types/TermSet.ts";

export const getSets = async () => {
    const response = await host.post(`/sets`);
    return response.data as Term[];
};

export const addSet = async (set: TermSet) => {
    await host.post(`/sets/`, set);
};

export const editTerm = async (set: TermSet) => {
    await host.put(`/sets/${set.id}`, set);
};

export const removeTerm = async (setId: string) => {
    await host.delete(`/sets/${setId}`);
};