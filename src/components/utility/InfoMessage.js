import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { COLORS, SIZES } from "../../constants";

const InfoMessage = (props) => {
  const animValue = useRef(new Animated.Value(0)).current;

  const handleChange = () => {
    props.onChange(false);
  };

  React.useEffect(() => {
    Animated.timing(animValue, {
      toValue: props.height,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [animValue]);

  return (
    <View style={styles.miniWindowContainer}>
      <Animated.View style={[styles.miniWindow, { opacity: animValue }]}>
        <TouchableOpacity
          style={styles.miniWindowTouchable}
          onPress={() => handleChange()}
        >
          <Text style={{ fontSize: SIZES.h2, alignSelf: "center" }}>
            Fermer
          </Text>
        </TouchableOpacity>
        <View style={styles.miniWindowContent}>
          {props.message.map((value, index) => {
            return (
              <Text key={index} value={value} style={styles.textMiniWindow}>
                {value}
              </Text>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  miniWindowContainer: {
    zIndex: 100,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  miniWindowTouchable: {
    padding: 10,
    backgroundColor: COLORS.lightGray3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  miniWindow: {
    width: "70%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 20,
  },
  miniWindowContent: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomStartRadius: 20,
    borderBottomRightRadius: 20,
  },
  textMiniWindow: {
    fontSize: 12,
    color: "gray",
    marginVertical: 10,
  },
});

export default InfoMessage;
