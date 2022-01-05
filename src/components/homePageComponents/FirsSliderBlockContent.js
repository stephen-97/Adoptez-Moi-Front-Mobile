import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { COLORS, icons, SIZES } from "../../constants";

const { width, height } = Dimensions.get("window");

const iconAnimalTab = [
  icons.animalType1,
  icons.animalType2,
  icons.animalType3,
  icons.animalType4,
  icons.animalType5,
];

const FirstSliderBlockContent = (props) => {

  const styles = StyleSheet.create({
    titreCarrousel: {
      fontSize: SIZES.h2,
      paddingVertical: 10,
    },
    carrouselContainer: {
      marginHorizontal: 10,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: props.color,
      width: width/2 - 20,
      borderRadius: 20,
      height: 200,
      alignSelf: "center",
      shadowColor: "#000",
      shadowRadius: 3,
      shadowOpacity: 0.5,
      shadowOffset: { width: 10, height: 0.5 },
      display: "flex",
      flexDirection: "row",
      overflow: "hidden",
    },
    pictureContainer: {
      height: 120,
      width: 120,
      left: 40,
      top: 20,
    },
    picture: {
      height: "100%",
      width: "100%",
      overflow: "hidden",
      borderRadius: 20,
    },
    textButton: {
      fontSize: SIZES.h2,
      color: "white",
    },
    count: {
      color: "white",
      fontSize: SIZES.h2,
      width: "100%",
      height: 25,
      position: "absolute",
      bottom: 20,
      textAlign: "center",
    },
  });

  return (
    <TouchableOpacity
      style={styles.carrouselContainer}
      activeOpacity={1}
      onPress={() => {
        props.navigation.push("SpeciePage", {
          count: props.count,
          color: props.color,
          color2: props.color2,
          species: props.species,
        });
      }}
    >
      <View style={styles.pictureContainer}>
        <Image style={styles.picture} source={iconAnimalTab[props.index]} />
      </View>
      <Text style={styles.count}>({props.count})</Text>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
  };
};

export default connect(mapStateToProps)(FirstSliderBlockContent);

