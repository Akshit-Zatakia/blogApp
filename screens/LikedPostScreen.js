import React, { useState } from "react";
import { RefreshControl, SafeAreaView, StatusBar, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  Card,
  Headline,
  IconButton,
  Paragraph,
  Title,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  getLikedPostUid,
  getPosts,
  likePost,
  unlikePost,
} from "../actions/post";

function LikedPostScreen({ navigation }) {
  const dispatch = useDispatch();
  // State for checking if data is loading or not.
  const [refreshing, setRefreshing] = useState(false);

  const { posts } = useSelector((state) => state.post);

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
        // alignItems: "center",
        justifyContent: "center",
        marginTop: StatusBar.currentHeight,
      }}
    >
      {like.length <= 0 && (
        <View
          style={{
            alignSelf: "center",
          }}
        >
          <Title
            style={{
              textAlign: "center",
            }}
          >
            No liked posts!
          </Title>
        </View>
      )}
      <FlatList
        numColumns={1}
        horizontal={false}
        data={posts}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
        }
        renderItem={({ item }) => {
          if (like.includes(item.id)) {
            return (
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
                      color="red"
                      onPress={() => {
                        dispatch(unlikePost(item.id));
                      }}
                    />
                  ) : (
                    <IconButton
                      icon="heart-outline"
                      color="red"
                      onPress={() => dispatch(likePost(item.id))}
                    />
                  )}
                </Card.Actions>
              </Card>
            );
          }
        }}
        style={{
          margin: 10,
        }}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

export default LikedPostScreen;
