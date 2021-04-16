import React, { useEffect } from "react";
import {
  Dimensions,
  Platform,
  PixelRatio,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Divider, Headline, Paragraph } from "react-native-paper";

function ShowContentScreen({ route, navigation }) {
  const { item } = route.params;

  // Get the screen height and width to make fonts responsive.
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get(
    "window"
  );

  // based on iphone 5s's scale
  const scale = SCREEN_WIDTH / 320;

  // It will make the fonts responsive.
  const normalize = (size) => {
    const newSize = size * scale;
    if (Platform.OS === "ios") {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  };

  useEffect(() => {
    navigation.setParams({
      title: item.title,
    });
  }, [item]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          source={{ uri: item.downloadUrl }}
          style={{
            aspectRatio: 1 / 1,
          }}
        />
        <Headline
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginVertical: 10,
            fontSize: normalize(22),
          }}
        >
          {item.title}
        </Headline>
        <Divider
          style={{
            width: 100,
            borderWidth: 1.5,
            alignSelf: "center",
          }}
        />
        <Paragraph
          style={{
            margin: 10,
            fontSize: normalize(14),
            textAlign: "justify",
          }}
        >
          {item.desc}
        </Paragraph>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ShowContentScreen;
