import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { SIZES } from "../../constants";

const RenderOthersAnimalFromUser = (props) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.block}
        onPress={props.onPress}
      >
        <View>
          <Image
            style={styles.image}
            source={{
              uri: props.image,
            }}
          />
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.specie}>{props.species}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default RenderOthersAnimalFromUser;

const styles = StyleSheet.create({
  block: {
    height: 100,
    marginBottom: 15,
    borderRadius: SIZES.borderRadius2,
    backgroundColor: "#cfcfcf",
  },
  image: {
    height: 80,
    width: 80,
    position: "absolute",
    top: 50,
    transform: [{ translateY: -40 }],
    left: 20,
    borderRadius: 50,
  },
  name: {
    position: "absolute",
    height: 30,
    top: 50,
    transform: [{ translateY: -15 }],
    alignItems: "center",
    left: 150,
    fontSize: SIZES.h2,
    color: "rgb(85,85,85)",
  },
  specie: {
    position: "absolute",
    height: 30,
    top: 50,
    transform: [{ translateY: -15 }],
    alignItems: "center",
    right: 50,
    fontSize: SIZES.h2,
    color: "rgb(85,85,85)",
  },
});
