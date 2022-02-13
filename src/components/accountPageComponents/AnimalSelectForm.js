import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  UIManager,
  Platform,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, SIZES, icons } from "../../constants";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AnimalSelectForm = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {}, 4000);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);
  return (
    <>
      <Text style={styles.title}>
        Quel type d'annonce souhaitez vous postez ?
      </Text>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.onChangeForm(true);
              props.onChangeSpecies("chien");
            }}
          >
            <Text style={styles.text}>Chien</Text>
            <Image style={styles.image} source={icons.animalType1} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.onChangeForm(true);
              props.onChangeSpecies("chat");
            }}
          >
            <Text style={styles.text}>Chat</Text>
            <Image style={styles.image} source={icons.animalType2} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.onChangeForm(true);
              props.onChangeSpecies("volatile");
            }}
          >
            <Text style={styles.text}>Volatile</Text>
            <Image style={styles.image} source={icons.animalType3} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.onChangeForm(true);
              props.onChangeSpecies("reptile");
            }}
          >
            <Text style={styles.text}>Reptile</Text>
            <Image style={styles.image} source={icons.animalType4} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.onChangeForm(true);
              props.onChangeSpecies("autres");
            }}
          >
            <Text style={styles.text}>Autres</Text>
            <Image style={styles.image} source={icons.animalType5} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
  };
};

export default connect(mapStateToProps)(AnimalSelectForm);

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: "white",
  },
  button: {
    width: 200,
    height: 80,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: COLORS.tertiary,
  },
  text: {
    fontSize: SIZES.h3,
    color: "white",
    marginRight: 20,
  },
  image: {
    position: "absolute",
    height: 40,
    width: 40,
    right: 20,
  },
  title: {
    fontSize: SIZES.h2,
    position: "absolute",
    top: 50,
    alignSelf: "center",
    color: COLORS.darkgray,
    textAlign: "center",
  }
});
