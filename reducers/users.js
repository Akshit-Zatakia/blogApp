import { USER_LOADED } from "../constants/actionTypes";

const initialState = {
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log("action -> ", action);
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
}
