import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
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
import { getUserPosts } from "../actions/post";

function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.users);
  const { post } = useSelector((state) => state.post);

  // State for checking if data is loading or not.
  const [refreshing, setRefreshing] = useState(false);

  // Method for performing reloading of data
  const refreshData = () => {
    setRefreshing(true);
    dispatch(getUserPosts());
    setRefreshing(false);
  };

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
            backgroundColor: "#00A3A3",
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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
            }
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
