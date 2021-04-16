import { POSTS_LOADED, POST_ADDED } from "../constants/actionTypes";

const initialState = {
  posts: [],
  isAdding: true,
  isLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case POST_ADDED:
      return {
        ...state,
        isAdding: false,
      };
    case POSTS_LOADED:
      return {
        ...state,
        posts: payload,
        isLoading: false,
      };
      return;
    default:
      return state;
  }
}
