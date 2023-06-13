import React, { useRef, useState } from "react";
import { StyleSheet, Text, Animated } from "react-native";
import { COLORS, SIZES } from "../../constants";

const BottomMessage = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animationUp = () => {
    Animated.timing(fadeAnim, {
      toValue: props.height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        animationDown();
      }, 4000);
    });
  };

  const animationDown = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => props.click(false));
  };

  React.useEffect(() => {
    animationUp();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.bottomMessage,
        {
          transform: [{ translateY: fadeAnim }],
          backgroundColor: props.color,
        },
      ]}
    >
      <Text>{props.message}</Text>
    </Animated.View>
  );
};

export default BottomMessage;

const styles = StyleSheet.create({
  bottomMessage: {
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    height: "8%",
    width: "90%",
    top: "100%",
    borderRadius: 20,
    flex: 1,
  },
});
