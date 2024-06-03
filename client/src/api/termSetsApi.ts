import {authHost} from ".";
import TermSet from "@shared/@types/TermSetDto.ts";

export const getSets = async () => {
    const response = await authHost.get(`/sets`);
    return response.data as TermSet[];
};

export const addOrUpdateSet = async (set: TermSet) => {
    const response = await authHost.put(`/sets`, set);
    return response.data.id;
};

export const removeSet = async (setId: string) => {
    const response = await authHost.delete(`/sets/${setId}`);
    return response.data.id;
};