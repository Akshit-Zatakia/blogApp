import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import {
  Avatar,
  Card,
  Headline,
  Subheading,
  Title,
  Button,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
import { onSignOut } from "../actions/users";

function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.users);
  const { post } = useSelector((state) => state.post);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate("LoadingScreen");
    }
  });

  return (
    user && (
      <SafeAreaView
        style={{
          marginTop: StatusBar.currentHeight,
          // alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Image
          source={{ uri: user.profile_picture }}
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
            alignSelf: "center",
            margin: 10,
            marginTop: 50,
          }}
        />
        <Headline style={{ textAlign: "center" }}>{user.display_name}</Headline>
        <Subheading style={{ textAlign: "center", marginBottom: 20 }}>
          {user.gmail}
        </Subheading>
        <Button
          style={{
            marginHorizontal: 20,
            backgroundColor: "blue",
            marginBottom: 10,
          }}
          mode="contained"
          onPress={(e) => {
            navigation.navigate("LoadingScreen");
            firebase.auth().signOut();
            dispatch(onSignOut());
          }}
        >
          Logout
        </Button>
        <View style={{ flex: 1 }}>
          <FlatList
            numColumns={2}
            horizontal={false}
            data={post}
            renderItem={({ item }) => (
              <Card
                style={{
                  flex: 1 / 2,
                  margin: 5,
                }}
                onPress={(e) => {
                  navigation.navigate("ShowContentScreen", { item });
                }}
              >
                <Image
                  source={{ uri: item.downloadUrl }}
                  style={{ aspectRatio: 1 / 1, flex: 1 }}
                />
                <Card.Content>
                  <Title>{item.title}</Title>
                </Card.Content>
              </Card>
            )}
          />
        </View>
      </SafeAreaView>
    )
  );
}

export default ProfileScreen;
