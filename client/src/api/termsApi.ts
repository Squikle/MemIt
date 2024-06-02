import { host } from ".";
import Term from "@shared/@types/Term";

export const getTerms = async (setId: string) => {
    const params = new URLSearchParams();
    params.append("setId", setId);

    const response = await host.post(`/terms`, {
        params: params
    });
    return response.data as Term[];
};

export const addTerm = async (term: Term) => {
    await host.post(`/terms`, term);
};

export const editTerm = async (term: Term) => {
    await host.put(`/terms/${term.id}`, term);
};

export const removeTerm = async (termId: string) => {
    await host.delete(`/terms/${termId}`);
};