import React, { useEffect, useState, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import SERVER from "../../../config";
import MiniButton from "../utility/MiniButton";
import Line from "../utility/Line";
import { COLORS, SIZES } from "../../constants";
import { TextInput } from "react-native-gesture-handler";
import Button from "../utility/Button";

const AnimalDeleteUserAccount = (props) => {
  const isVisible = useIsFocused();
  const [touchable, setTouchable] = useState(false);
  useEffect(() => {}, []);

  const animValue = useRef(new Animated.Value(-550)).current;
  const animValueOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: 250,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(animValueOpacity, {
      toValue: 0.6,
      duration: 400,
      useNativeDriver: false,
    }).start(() => setTouchable(true));
  }, []);

  const closeFilter = () => {
    setTouchable(false);
    Animated.timing(animValue, {
      toValue: -550,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(animValueOpacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start(() => props.navigation.goBack(null));
  };

  return (
    <>
      <Animated.View style={[styles.deleteBlock, { bottom: animValue }]}>
        <TouchableOpacity
          style={styles.miniWindowTouchable}
          onPress={() => closeFilter()}
        >
          <Text style={{ fontSize: SIZES.h2, alignSelf: "center" }}>
            Fermer
          </Text>
        </TouchableOpacity>
        <Text style={styles.title}>Motif du bannissement</Text>
        <TextInput
          multiline
          numberOfLines={4}
          maxLength={200}
          style={styles.textAreaInput}
          onChange={(e) => null}
        ></TextInput>
        <Button name="Confirmer Ban" />
      </Animated.View>
      <Animated.View
        style={[styles.fullContainer, { opacity: animValueOpacity }]}
      ></Animated.View>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
    DeleteAnimalProps: state.DeleteAnimalReducer,
  };
};

export default connect(mapStateToProps)(AnimalDeleteUserAccount);

const styles = StyleSheet.create({
  fullContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteBlock: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "white",
    height: 300,
    width: 350,
    alignSelf: "center",
    borderRadius: SIZES.borderRadius2,
  },
  miniWindowTouchable: {
    padding: 10,
    backgroundColor: COLORS.lightGray3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title:{
    color: COLORS.tertiary,
    marginLeft: 15,
    marginTop: 15,
    fontSize: SIZES.h4,
  },
  textAreaInput: {
    padding: 20,
    paddingBottom: 10,
    paddingTop: 10,
    margin: 15,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    height: 100,
    backgroundColor: COLORS.lightGray3,
  },
});
