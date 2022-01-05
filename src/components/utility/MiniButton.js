import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../constants";

const MiniButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, props.extraStyle]}
    >
      <Text style={styles.textButton}>{props.name}</Text>
    </TouchableOpacity>
  );
};

export default MiniButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: COLORS.tertiary,
    borderRadius: 5,
    height: 40,
    minWidth: 50,
    width: "auto",
    paddingHorizontal: 10,
  },
  textButton: {
    fontSize: SIZES.h4,
    color: "white",
  },
});
