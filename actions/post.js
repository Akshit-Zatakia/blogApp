import firebase from "firebase";
require("firebase/firestore");
import { POST_ADDED } from "../constants/actionTypes";

export const savePost = (downloadUrl, title, desc) => async (
  dispatch,
  getState
) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(getState().users.user.uid)
    .collection("userPosts")
    .add({
      downloadUrl,
      title,
      desc,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      dispatch({
        type: POST_ADDED,
      });
    });
};
