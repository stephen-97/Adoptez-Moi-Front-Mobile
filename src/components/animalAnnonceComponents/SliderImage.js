import React, { useState } from "react";
import {
  Image,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import { COLORS } from "../../constants/theme";

const images = [
  "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
];

const { width } = Dimensions.get("window");
const height = width * 0.6;

const SliderImage = (props) => {
  const [active, setActive] = useState(0);

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive({ active: slide });
    }
  };
  return (
    <View style={styles.sliderContainer}>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={change}
        showsHorizontalScrollIndicator={false}
        style={{ width, height }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.imagesSlider}
          />
        ))}
      </ScrollView>
      <View style={styles.dotSlider}>
        {images.map((i, k) => (
          <Text
            key={k}
            style={
              k.id === active ? styles.dotPaddingTrue : styles.dotPaddingFalse
            }
          >
            ⬤
          </Text>
        ))}
      </View>
    </View>
  );
};

export default SliderImage;

const styles = StyleSheet.create({
  sliderContainer: {
    marginTop: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    overflow: "hidden",
  },
  imagesSlider: {
    width,
    height,
    resizeMode: "contain",
  },
  dotSlider: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  dotPaddingFalse: {
    color: "#888",
    marginHorizontal: 2,
  },
  dotPaddingTrue: {
    color: "white",
    marginHorizontal: 2,
  },
});
