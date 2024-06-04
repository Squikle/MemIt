import {authHost} from ".";
import TermDto from "@shared/@types/dto/TermDto";

export const getTermsBySet = async (setId: string) => {
    const params = new URLSearchParams();
    params.append("setId", setId);

    const response = await authHost.get(`/terms`, {
        params: params
    });
    return response.data as TermDto[];
};

export const getTerm = async (termId: string) => {
    const response = await authHost.get(`/terms/${termId}`);
    return response.data as TermDto;
};

export const addOrUpdateTerm = async (term: TermDto) => {
    const response = await authHost.put(`/terms`, term);
    return response.data.id;
};

export const removeTerm = async (termId: string) => {
    const response = await authHost.delete(`/terms/${termId}`);
    return response.data.id;
};