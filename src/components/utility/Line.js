import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

const Line = (props) => {
  return <View style={[styles.line,{ borderColor: props.color}]}></View>;
};

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    width: "100%",
  },
});

export default Line;
