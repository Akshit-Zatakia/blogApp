import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { Headline } from "react-native-paper";

function ShowContentScreen({ route, navigation }) {
  const { item } = route.params;
  useEffect(() => {
    navigation.setParams({
      title: item.title,
    });
  }, [item]);
  return (
    <SafeAreaView>
      <Headline>{item.title}</Headline>
    </SafeAreaView>
  );
}

export default ShowContentScreen;
