import {authHost} from ".";
import Term from "@shared/@types/Term";

export const getTermsBySet = async (setId: string) => {
    const params = new URLSearchParams();
    params.append("setId", setId);

    const response = await authHost.get(`/terms`, {
        params: params
    });
    return response.data as Term[];
};

export const getTerm = async (termId: string) => {
    const response = await authHost.get(`/terms/${termId}`);
    return response.data as Term;
};

export const addOrUpdateTerm = async (term: Term) => {
    const response = await authHost.put(`/terms`, term);
    return response.data.id;
};

export const removeTerm = async (termId: string) => {
    const response = await authHost.delete(`/terms/${termId}`);
    return response.data.id;
};