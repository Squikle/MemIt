import { combineReducers } from "redux";
import termsReducer from "./terms";
import termsSetsReducer from "./termsSets";

export default combineReducers({
  terms: termsReducer,
  termsSets: termsSetsReducer,
});
