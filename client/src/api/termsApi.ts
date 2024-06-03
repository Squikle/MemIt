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

export const addTerm = async (term: Term) => {
    await authHost.post(`/terms`, term);
};

export const editTerm = async (term: Term) => {
    await authHost.put(`/terms/${term.id}`, term);
};

export const removeTerm = async (termId: string) => {
    await authHost.delete(`/terms/${termId}`);
};