import { combineReducers } from "redux";
import authReducer from "./auth";
import alertReducer from "./alert";
import commonReducer from "./common";
import dashboardReducer from "./dashboard";
import otherReducer from "./other";
import userReducer from "./user";
import voterReducer from "./voter";
import ticketReducer from "./ticket";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  common: commonReducer,
  dashboard: dashboardReducer,
  other: otherReducer,
  ticket: ticketReducer,
  user: userReducer,
  voter: voterReducer,
});
