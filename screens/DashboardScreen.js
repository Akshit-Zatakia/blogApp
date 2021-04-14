import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import firebase from "firebase";
import { useSelector } from "react-redux";
export default function DashboardScreen() {
  const { user } = useSelector((state) => state.users);
  console.log(user);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Dashboard</Text>
      <Button title="Logout" onPress={() => firebase.auth().signOut()} />
    </View>
  );
}
