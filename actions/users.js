import firebase from "firebase";
import { USER_LOADED } from "../constants/actionTypes";
require("firebase/firestore");

isUserEqual = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
};

export const onSignIn = (googleUser) => async (dispatch) => {
  // console.log("Google Auth Response", googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!this.isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );

      // Sign in with credential from the Google user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          const obj = {
            gmail: result.user.email,
            profile_picture: result.additionalUserInfo.profile.picture,
            first_name: result.additionalUserInfo.profile.given_name,
            last_name: result.additionalUserInfo.profile.family_name,
            createdAt: Date.now(),
          };
          if (result.additionalUserInfo.isNewUser) {
            firebase
              .firestore()
              .collection("users")
              .doc(result.user.uid)
              .set(obj)
              .then((snapshot) => {
                console.log("snapshot ->", snapshot);
                dispatch({
                  type: USER_LOADED,
                  payload: obj,
                });
              })
              .catch((e) => {});
          } else {
            firebase
              .firestore()
              .collection("users")
              .doc(result.user.uid)
              .update({
                lastLoggedIn: Date.now(),
              })
              .then(() => {
                dispatch({
                  type: USER_LOADED,
                  payload: obj,
                });
              });
          }
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    } else {
      console.log("User already signed-in Firebase.");
    }
  });
};
