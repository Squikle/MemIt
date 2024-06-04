import {authHost} from ".";
import TermsSetDto from "@shared/@types/dto/TermsSetDto";

export const getSets = async () => {
    const response = await authHost.get(`/sets`);
    return response.data as TermsSetDto[];
};

export const addOrUpdateSet = async (set: TermsSetDto) => {
    const response = await authHost.put(`/sets`, set);
    return response.data.id;
};

export const removeSet = async (setId: string) => {
    const response = await authHost.delete(`/sets/${setId}`);
    return response.data.id;
};