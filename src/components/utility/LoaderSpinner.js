import React, { useRef } from "react";
import { StyleSheet, Animated } from "react-native";
import { icons } from "../../constants";

const LoaderSpinner = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animationUp = () => {
    Animated.loop(
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  };
  React.useEffect(() => {
    animationUp();
  }, [fadeAnim]);
  const spin = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  return (
    <Animated.Image
      style={[
        styles.bottomMessage,
        {
          transform: [{ rotate: spin }],
        },
      ]}
      source={icons.spinner}
    ></Animated.Image>
  );
};

export default LoaderSpinner;

const styles = StyleSheet.create({
  bottomMessage: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderRadius: 5,
    height: 50,
    width: 50,
  },
});
