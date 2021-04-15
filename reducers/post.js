import { POST_ADDED } from "../constants/actionTypes";

const initialState = {
  posts: [],
  isAdding: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case POST_ADDED:
      return {
        ...state,
        isAdding: false,
      };
    default:
      return state;
  }
}
