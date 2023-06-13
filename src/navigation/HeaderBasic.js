import React, { useState } from "react";
import { connect } from "react-redux";
import { Header, Body, Title } from "native-base";
import { Image, StyleSheet, TouchableHighlight } from "react-native";
import { COLORS } from "../constants/theme";
import icons from "../constants/icons";

const imageContainerHeight = 40;

const HeaderBasic = (props) => {
  return (
    <>
      <Header style={styles.navBarHeader}>
        <Body style={styles.body}>
          <TouchableHighlight
            style={styles.imageContainerNav}
            onPress={() => props.navigation.goBack(null)}
          >
            <Image style={styles.imageNav} source={icons.crossCloseModal} />
          </TouchableHighlight>
          <Title style={styles.title}>{props.name}</Title>
        </Body>
      </Header>
    </>
  );
};

export default HeaderBasic;

const styles = StyleSheet.create({
  navBarHeader: {
    overflow: "hidden",
    backgroundColor: COLORS.secondary,
    flexDirection: "row",
  },
  body: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    alignSelf: "center",
  },
  imageContainerNav: {
    height: 40,
    width: 40,
    position: "absolute",
    right: "5%",
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
    transform: [{translateX: '-40'}]
  },
});
