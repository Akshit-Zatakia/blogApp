import firebase from "firebase";
require("firebase/firestore");
import {
  LIKE_POSTS,
  POSTS_LOADED,
  POST_ADDED,
  USER_POST_LOADED,
} from "../constants/actionTypes";

export const savePost = (downloadUrl, title, desc) => async (
  dispatch,
  getState
) => {
  firebase
    .firestore()
    .collection("users")
    .doc(getState().users.user.uid)
    .collection("posts")
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

export const getPosts = () => async (dispatch, getState) => {
  firebase
    .firestore()
    .collectionGroup("posts")
    .get()
    .then((snapshot) => {
      // console.log(snapshot.docs);
      const posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      dispatch({
        type: POSTS_LOADED,
        payload: posts,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserPosts = () => async (dispatch, getState) => {
  firebase
    .firestore()
    .collection("users")
    .doc(getState().users.user.uid)
    .collection("posts")
    .get()
    .then((snapshot) => {
      // console.log("userpost", snapshot.docs);
      const posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      dispatch({
        type: USER_POST_LOADED,
        payload: posts,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const likePost = (postUid) => async (dispatch, getState) => {
  firebase
    .firestore()
    .collection("likes")
    .doc(getState().users.user.uid)
    .collection("likedPosts")
    .doc(postUid)
    .set({
      flag: true,
    })
    .then(() => {
      dispatch(getLikedPostUid());
    });
};

export const unlikePost = (postUid) => async (dispatch, getState) => {
  firebase
    .firestore()
    .collection("likes")
    .doc(getState().users.user.uid)
    .collection("likedPosts")
    .doc(postUid)
    .delete()
    .then(() => {
      dispatch(getLikedPostUid());
    });
};

export const getLikedPostUid = () => async (dispatch, getState) => {
  firebase
    .firestore()
    .collection("likes")
    .doc(getState().users.user.uid)
    .collection("likedPosts")
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return doc.id;
      });

      dispatch({
        type: LIKE_POSTS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log("likeerror", error);
    });
};
