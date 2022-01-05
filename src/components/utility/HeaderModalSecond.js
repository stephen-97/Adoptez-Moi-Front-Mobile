import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { SIZES, icons } from "../../constants";

const HeaderModalSecond = (props) => {
  return (
    <View style={[styles.header, props.extraStyle]}>
      <TouchableOpacity onPress={props.onPress} style={styles.imageContainer}>
        <Image style={styles.image} source={icons.crossCloseModal} />
      </TouchableOpacity>
      <Text style={styles.titleHeader}>{props.title}</Text>
    </View>
  );
};

export default HeaderModalSecond;

const styles = StyleSheet.create({
  titleHeader: {
    fontSize: SIZES.h1,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
    position: "absolute",
    width: "100%",
    top: 45,
    transform: [{ translateY: -18 }],
  },
  image: {
    height: 50,
    width: 50,
  },
  imageContainer: {
    position: "absolute",
    top: 45,
    left: 30,
    zIndex: 1,
    height: 50,
    width: 50,
    transform: [{ translateY: -25 }],
  },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 90,
    zIndex: 1,
  },
  imageBlur: {
    width: "100%",
    height: "100%",
  },
});
