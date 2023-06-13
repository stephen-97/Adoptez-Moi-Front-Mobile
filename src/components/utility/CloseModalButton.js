import React from "react";
import { StyleSheet, TouchableHighlight, Image } from "react-native";
import { icons } from "../../constants";

const CloseModal = (props) => {
  return (
    <TouchableHighlight
      style={styles.imageCrossContainer}
      onPress={props.navigation}
    >
      <Image style={styles.imageCross} source={icons.crossCloseModal} />
    </TouchableHighlight>
  );
};

export default CloseModal;

const styles = StyleSheet.create({
  imageCrossContainer: {
    position: "absolute",
    marginBottom: 10,
    zIndex: 1,
    height: 30,
    width: 30,
    top: "7%",
    left: "8%",
    backgroundColor: "gray",
    borderRadius: 100,
  },
  imageCross: {
    height: 30,
    width: 30,
    position: "absolute",
  },
});
