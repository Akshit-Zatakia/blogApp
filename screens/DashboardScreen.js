import React, { Component, useEffect } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { onSignOut } from "../actions/users";
import { Appbar, FAB } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "./HomeScreen";
export default function DashboardScreen({ navigation }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.users);
  const Tab = createMaterialBottomTabNavigator();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate("LoginScreen");
    }
  });

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      barStyle={{ backgroundColor: "red" }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        navigation={navigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icons name="home" color={color} size={26} />
          ),
          tabBarLabel: "Home",
        }}
      />
    </Tab.Navigator>
  );
}
