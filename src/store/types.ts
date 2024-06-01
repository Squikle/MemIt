import rootReducer from "@/store/rootReducer.ts";

export type Term = {
    id: string,
    expression?: string,
    expressionImage?: string,
    translation?: string,
    translationImage?: string,
    setId: string,
    isNew?: boolean
};

export type TermSet = {
    id: string,
    name: string,
}

export type RootState = ReturnType<typeof rootReducer>;