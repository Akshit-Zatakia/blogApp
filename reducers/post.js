import {
  POSTS_LOADED,
  POST_ADDED,
  USER_POST_LOADED,
} from "../constants/actionTypes";

const initialState = {
  posts: [],
  post: [],
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
    case USER_POST_LOADED:
      return {
        ...state,
        post: payload,
      };
    default:
      return state;
  }
}
