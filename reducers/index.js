import { combineReducers } from "redux";
import users from "./users";
import post from "./post";

export default combineReducers({
  users,
  post,
});
