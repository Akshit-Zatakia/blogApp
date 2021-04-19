import React, { Component, useEffect } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { onSignOut } from "../actions/users";
import { Appbar, FAB } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import LikedPostScreen from "./LikedPostScreen";
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
      barStyle={{ backgroundColor: "white" }}
      activeColor="#00A3A3"
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
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        navigation={navigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icons name="account" color={color} size={26} />
          ),
          tabBarLabel: "Profile",
        }}
      />
      <Tab.Screen
        name="LikedPostScreen"
        component={LikedPostScreen}
        navigation={navigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icons name="heart" color={color} size={26} />
          ),
          tabBarLabel: "Liked",
        }}
      />
    </Tab.Navigator>
  );
}
