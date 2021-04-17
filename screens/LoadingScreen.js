import React, { Component, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { checkUser, loadUser } from "../actions/users";
import { getPosts, getUserPosts } from "../actions/post";

export default function LoadingScreen({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(loadUser(user));
        dispatch(getPosts());
        dispatch(getUserPosts());
        navigation.navigate("DashboardScreen");
      } else {
        navigation.navigate("LoginScreen");
      }
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" color="red" />
    </View>
  );
}
