import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../constants";

const ButtonDeleteAdmin = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, props.extraStyle]}
    >
      <Text style={styles.textButton}>{props.name}</Text>
    </TouchableOpacity>
  );
};

export default ButtonDeleteAdmin;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingLeft: SIZES.padding2,
    paddingRight: SIZES.padding2,
    backgroundColor: COLORS.darkgray,
    borderRadius: 5,
    height: 60,
    minWidth: 80,
    width: "auto",
  },
  textButton: {
    fontSize: SIZES.h4,
    color: "white",
  },
});
