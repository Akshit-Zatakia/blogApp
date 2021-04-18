import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StatusBar, Text, View } from "react-native";
import {
  Button,
  Appbar,
  Card,
  FAB,
  Paragraph,
  Searchbar,
  Title,
  IconButton,
} from "react-native-paper";
import { SafeAreaView } from "react-navigation";

import firebase from "firebase";
import { onSignOut } from "../actions/users";
import { useDispatch, useSelector } from "react-redux";
import {
  getLikedPostUid,
  getPosts,
  likePost,
  unlikePost,
} from "../actions/post";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  // State for search query
  const [search, setSearch] = useState("");
  // State for checking if data is loading or not.
  const [refreshing, setRefreshing] = useState(false);
  // Get all the posts from state.
  const { posts } = useSelector((state) => state.post);
  // Get all the liked posts id
  const { like } = useSelector((state) => state.post);

  // Method for performing reloading of data
  const refreshData = () => {
    setRefreshing(true);
    dispatch(getPosts());
    dispatch(getLikedPostUid());

    setRefreshing(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight,
      }}
    >
      <Searchbar
        placeholder="Search for blogs.."
        style={{
          margin: 18,
        }}
        value={search}
        onChangeText={(e) => setSearch(e)}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={
          search !== ""
            ? posts.filter((post) => post.title.includes(search))
            : posts
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
        }
        renderItem={({ item }) => (
          <Card
            style={{
              margin: 8,
            }}
            onPress={(e) => {
              navigation.navigate("ShowContentScreen", { item });
            }}
          >
            <Card.Cover
              source={{ uri: item.downloadUrl }}
              loadingIndicatorSource
            />
            <Card.Content>
              <Title>{item.title}</Title>
              <Paragraph numberOfLines={1}>{item.desc}</Paragraph>
            </Card.Content>
            <Card.Actions>
              {like.includes(item.id) ? (
                <IconButton
                  icon="heart"
                  onPress={() => {
                    dispatch(unlikePost(item.id));
                  }}
                />
              ) : (
                <IconButton
                  icon="heart-outline"
                  onPress={() => dispatch(likePost(item.id))}
                />
              )}
            </Card.Actions>
          </Card>
        )}
        style={{
          margin: 10,
        }}
        keyExtractor={(item) => item.id}
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
