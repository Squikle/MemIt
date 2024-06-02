import { combineReducers } from "redux";
import entitiesReducer from "./entitiesReducer.ts";

export default combineReducers({ entities: entitiesReducer });
