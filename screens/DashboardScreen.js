import React, { Component } from "react";
import { Text, View } from "react-native";

export class DashboardScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Dashboard</Text>
      </View>
    );
  }
}

export default DashboardScreen;
