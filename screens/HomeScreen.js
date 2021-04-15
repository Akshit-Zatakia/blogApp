import React from "react";
import { Button, Text } from "react-native";
import { FAB } from "react-native-paper";
import { SafeAreaView } from "react-navigation";

import firebase from "firebase";
import { onSignOut } from "../actions/users";
import { useDispatch } from "react-redux";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#000",
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
      <FAB
        color="white"
        icon="plus"
        style={{
          backgroundColor: "red",
          position: "absolute",
          right: 10,
          bottom: 10,
        }}
        onPress={() => {
          navigation.navigate("AddPostScreen");
        }}
      />
    </SafeAreaView>
  );
}
