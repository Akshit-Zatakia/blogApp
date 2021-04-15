import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Dialog, Portal, Title } from "react-native-paper";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { useDispatch, useSelector } from "react-redux";
import { savePost } from "../actions/post";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

export default function AddPostScreen({ navigation }) {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  // Get the user data because to add the uid of user in imagePath
  const { user } = useSelector((state) => state.users);

  // Get the loading status from post reducer
  const { isAdding } = useSelector((state) => state.post);

  // States to Check if app has permission to access images
  const [hasPermission, setHasPermission] = useState(null);

  // States for getting the value from input field
  // title and description
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Set the selected image in this state
  const [image, setImage] = useState(null);

  // Create the dialog component to show the loading status and message
  const customDialog = () => {
    return <View></View>;
  };
  // Get the request for image
  useEffect(() => {
    (async () => {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [hasPermission]);

  // This method will launch the file manager to get the image.
  // For launching the file manager launchImageLibraryAsync is
  // useful.
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Uploading the image to firebase storage.
  // Before that compressing the image to save the firebase storage
  const uploadImage = async () => {
    setVisible(true);
    // using expo-image-manipulator library to compress the image
    const { uri } = await ImageManipulator.manipulateAsync(image, [], {
      compress: 0.5,
      format: ImageManipulator.SaveFormat.JPEG,
    });
    // Set the path in firebase storage as :
    //  posts/{userId}/{randomGeneratedNumber}
    const imagePath = `posts/${user.uid}/${Math.random().toString(36)}`;

    // Fetch the image from uri
    const tempImage = await fetch(uri);
    // Create the blob of image
    const blob = await tempImage.blob();

    // Create the task to monitor the progress of image uploading
    const task = firebase.storage().ref().child(imagePath).put(blob);

    // Give us the progress of uploading of image
    const taskProgress = (snapshot) => {};

    // Give us the download url of image
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        // Call the savePost action to add the data to firebase
        dispatch(savePost(snapshot, title, description));
        navigation.navigate("DashboardScreen");
      });
    };

    // Give us the error if some
    const taskError = (snapshot) => {};

    // Now attach the task with this 3 methods
    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  // Checking if there are no permissions then it will return
  // text that please allow your files.
  if (hasPermission === null) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>No access to image</Text>
      </SafeAreaView>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          {image ? (
            <TouchableOpacity onPress={(e) => pickImage()} disabled={visible}>
              <Image source={{ uri: image }} style={styles.image} />
            </TouchableOpacity>
          ) : (
            <Button
              icon="camera"
              style={styles.imageContainerButton}
              onPress={(e) => pickImage()}
            >
              Select Image
            </Button>
          )}
        </View>

        <TextInput
          value={title}
          selectionColor="red"
          mode="outlined"
          placeholder="Enter the title"
          label="Title"
          style={styles.textInputStyle}
          onChangeText={(title) => setTitle(title)}
          disabled={visible}
        />
        <TextInput
          value={description}
          selectionColor="red"
          mode="outlined"
          multiline={true}
          numberOfLines={4}
          placeholder="Enter the description"
          label="Description"
          style={styles.textInputStyle}
          onChangeText={(desc) => setDescription(desc)}
          disabled={visible}
        />

        <Button
          mode="contained"
          style={styles.buttonStyle}
          onPress={(e) => uploadImage()}
          loading={visible}
          disabled={
            title !== "" && description !== "" && image !== null ? false : true
          }
        >
          Add
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    margin: 5,
    backgroundColor: "lightgrey",
    aspectRatio: 1 / 1,
    justifyContent: "center",
  },
  imageContainerButton: {},
  textInputStyle: {
    margin: 5,
    textAlign: "justify",
    backgroundColor: "#fff",
  },
  buttonStyle: {
    margin: 5,
  },
});
