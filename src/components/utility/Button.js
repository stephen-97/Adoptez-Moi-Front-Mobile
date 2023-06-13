import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../constants";

const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, props.extraStyle]}
    >
      <Text style={styles.textButton}>{props.name}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: SIZES.padding2,
    backgroundColor: COLORS.tertiary,
    borderRadius: 5,
    minWidth: 120,
    width: "auto",
  },
  textButton: {
    fontSize: SIZES.h2,
    color: "white",
  },
});
