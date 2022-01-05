import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { COLORS, SIZES, icons } from "../../constants";

const HeaderModal = (props) => {
  return (
    <View style={[styles.header, props.extraStyle]}>
      <TouchableOpacity onPress={props.onPress} style={{ zIndex: 1 }}>
        <Image style={styles.image} source={icons.arrowFwd} />
      </TouchableOpacity>
      <Text style={styles.titleHeader}>{props.title}</Text>
      <Image style={styles.imageBlur} source={icons.blur} />
    </View>
  );
};

export default HeaderModal;

const styles = StyleSheet.create({
  titleHeader: {
    fontSize: SIZES.h1,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
    position: "absolute",
    width: "100%",
    top: 55,
  },
  image: {
    height: 50,
    width: 50,
    position: "absolute",
    top: 50,
    left: 30,
    transform: [{ rotate: "180deg" }],
    zIndex: 2,
  },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 120,
    zIndex: 1,
  },
  imageBlur: {
    width: "100%",
    height: "100%",
  },
});
