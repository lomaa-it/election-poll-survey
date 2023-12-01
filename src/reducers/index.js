import { combineReducers } from "redux";
import authReducer from "./auth";
import alertReducer from "./alert";
import commonReducer from "./common";
import voterReducer from "./voter";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  common: commonReducer,
  voter: voterReducer,
});
