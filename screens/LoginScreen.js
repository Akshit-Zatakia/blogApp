import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import * as Google from "expo-google-app-auth";
import { useDispatch } from "react-redux";
import firebase from "firebase";
require("firebase/firestore");

import { ANDROIDCLIENTID } from "@env";
import { onSignIn } from "../actions/users";

export default function LoginScreen() {
  const dispatch = useDispatch();

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: "web",
        androidClientId: ANDROIDCLIENTID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        dispatch(onSignIn(result));
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        onPress={() => signInWithGoogleAsync()}
        title="Sign In With Google"
      />
    </View>
  );
}
