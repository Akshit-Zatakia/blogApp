import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";
import * as Google from "expo-google-app-auth";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
require("firebase/firestore");

import { ANDROIDCLIENTID } from "@env";
import { onSignIn } from "../actions/users";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  // If the user login process is going on or not to check that loading state is used.
  const [loading, setLoading] = useState(false);

  // Destructring the isAuthenticated from users state
  const { isAuthenticated } = useSelector((state) => state.users);

  // Checking if isAuthenticated is true then navigate to dashboard.
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("DashboardScreen");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Method to pop up the Google account and save the user's info
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
        backgroundColor: "#000",
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontFamily: "sans-serif-medium",
          margin: 10,
          marginBottom: 20,
          fontSize: 24,
        }}
      >
        Welcome to Bloggie
      </Text>

      {/* Checking if loading is true then render ActivityIndicator i.e. loading spinner
        else
        render signin button
      */}
      {loading ? (
        <ActivityIndicator color="red" size="large" />
      ) : (
        <Button
          color="red"
          onPress={() => {
            setLoading(true);
            signInWithGoogleAsync();
          }}
          title="Sign In With Google"
        />
      )}
    </View>
  );
}
