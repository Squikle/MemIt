import { combineReducers } from "redux";
import termsReducer from "./terms.ts";
import termsSetsReducer from "./termsSets.ts";

export default combineReducers({
  terms: termsReducer,
  termsSets: termsSetsReducer,
});
