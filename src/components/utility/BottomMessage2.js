import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
} from "react-native";
import { COLORS, SIZES, icons } from "../../constants";

const BottomMessage2 = (props) => {
  const messageColor = () => {
    if (props.status == 200) {
      return { backgroundColor: "#71777880", borderColor: "#717778" };
    }
    return { backgroundColor: "#f0284280", borderColor: "#f02842" };
  };

  return (
    <View style={[styles.bottomMessage, messageColor()]}>
      <Text style={styles.text}>{props.message}</Text>
      <TouchableHighlight
        style={styles.imageCrossContainer}
        onPress={() => props.click(false)}
      >
        <Image style={styles.imageCross} source={icons.crossCloseModal} />
      </TouchableHighlight>
    </View>
  );
};

export default BottomMessage2;

const styles = StyleSheet.create({
  bottomMessage: {
    zIndex: 2,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: COLORS.tertiary,
    borderRadius: 5,
    height: 60,
    width: "90%",
    opacity: 0.5,
    borderColor: "#717778",
    borderWidth: 2,
  },
  imageCrossContainer: {
    position: "absolute",
    right: "2%",
    top: 31,
    transform: [{ translateY: -10 }],
  },
  imageCross: {
    height: 20,
    width: 20,
  },
  text: {
    textAlign: "center",
    width: 250,
    color: "black",
  },
});

/**
 * import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
} from "react-native";
import { COLORS, SIZES, icons } from "../../constants";

const BottomMessage2 = (props) => {
 

  return (
    <View
      style={[
        styles.bottomMessage,
        {
          backgroundColor: "#71777880",
        },
      ]}
    >
      <Text style={styles.text}>{props.message}</Text>
      <TouchableHighlight
        style={styles.imageCrossContainer}
        onPress={() => props.click(false)}
      >
        <Image style={styles.imageCross} source={icons.crossCloseModal} />
      </TouchableHighlight>
    </View>
  );
};

export default BottomMessage2;

const styles = StyleSheet.create({
  bottomMessage: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: COLORS.tertiary,
    borderRadius: 5,
    height: 60,
    width: "90%",
    opacity: 0.5,
    borderColor: "#717778",
    borderWidth: 2,
  },
  imageCrossContainer: {
    position: "absolute",
    right: "2%",
    top: 31,
    transform: [{ translateY: "-10" }],
  },
  imageCross: {
    height: 20,
    width: 20,
  },
  text: {
    textAlign: "center",
    width: 250,
  },
});

 */