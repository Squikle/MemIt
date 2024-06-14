import { combineReducers } from "redux";
import entitiesReducer from "./entitiesReducer.ts";

const ROOT_ACTIONS = {
    LOGOUT: 'Logout',
} as const
export type RootActions = typeof ROOT_ACTIONS[keyof typeof ROOT_ACTIONS];

const appReducer = combineReducers({ entities: entitiesReducer });

export default (state: any, action: any) => {
    if (action.type as RootActions === "Logout") {
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
}