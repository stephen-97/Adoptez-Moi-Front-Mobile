import React, { useState } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { Image, StyleSheet, TouchableHighlight } from "react-native";
import { COLORS } from "../constants/theme";
import icons from "../constants/icons";

const imageContainerHeight = 40;

const HeaderBasic = (props) => {
  return (
    <View style={styles.navBarHeader}>
      <View style={styles.body}>
        <TouchableHighlight
          style={styles.imageContainerNav}
          onPress={() => props.navigation.goBack(null)}
        >
          <Image style={styles.imageNav} source={icons.crossCloseModal} />
        </TouchableHighlight>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.name}</Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderBasic;

const styles = StyleSheet.create({
  navBarHeader: {
    overflow: "hidden",
    backgroundColor: COLORS.secondary,
    flexDirection: "row",
    height: 110,
  },
  body: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  titleContainer: {
    height: 40,
    position: "absolute",
    top: "40%",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
  },
  imageContainerNav: {
    height: 40,
    width: 40,
    position: "absolute",
    right: "7.5%",
    top: "40%",
  },
  imageContainerAccount: {
    height: imageContainerHeight,
    width: 40,
    position: "absolute",
    left: 50,
  },
  imageNav: {
    maxHeight: "100%",
    maxWidth: "100%",
    zIndex: 1,
    top: "2.5%",
  },
  sliderAccount: {
    position: "absolute",
    left: "10%",
    width: 160,
    top: 112,
    backgroundColor: COLORS.lightGray3,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    zIndex: 1,
    transform: [{translateX: -40}]
  },
});
