import React, { Component, useEffect } from "react";
import { Button, Text, View } from "react-native";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { onSignOut } from "../actions/users";
import { FAB } from "react-native-paper";
import { CustomAppbar } from "../components/CustomAppbar.js";
export default function DashboardScreen({ navigation }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.users);
  console.log(user, isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate("LoginScreen");
    }
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
      }}
    >
      <Text>Dashboard</Text>
      <Button
        title="Logout"
        onPress={() => {
          firebase.auth().signOut();
          dispatch(onSignOut());
        }}
      />
      <FAB small icon="plus" />
    </View>
  );
}
