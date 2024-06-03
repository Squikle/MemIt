import {authHost} from ".";
import TermSet from "@shared/@types/TermSet.ts";

export const getSets = async () => {
    const response = await authHost.get(`/sets`);
    return response.data as TermSet[];
};

export const addSet = async (set: TermSet) => {
    await authHost.post(`/sets/`, set);
};

export const editTerm = async (set: TermSet) => {
    await authHost.put(`/sets/${set.id}`, set);
};

export const removeTerm = async (setId: string) => {
    await authHost.delete(`/sets/${setId}`);
};