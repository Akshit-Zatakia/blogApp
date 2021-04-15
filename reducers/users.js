import { USER_LOADED, USER_SIGN_OUT } from "../constants/actionTypes";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log("action -> ", action);
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
      };
    case USER_SIGN_OUT:
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
