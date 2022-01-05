import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from "../../constants";

const { width, height } = Dimensions.get("window");

const SliderBLockContent = (props) => {
  return (
    <TouchableOpacity
      style={styles.carrouselContainer}
      activeOpacity={1}
      onPress={() => {
        props.navigation.navigate("AnimalBigScreen", {
          data: props.data,
          navigation: props.navigation,
        });
      }}
    >
      <View style={styles.pictureContainer}>
        <Image style={styles.picture} source={props.picture} />
      </View>
      <View style={styles.info}>
        <View style={styles.textContainer}>
          <Text style={styles.prenom}>{props.nom}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.espece}>{props.espece}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.region}>{props.department}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => {
  return {
    NavProps: state.SendNavPropsReducer,
    AuthProps: state.AuthentificationReducer,
  };
};

export default connect(mapStateToProps)(SliderBLockContent);

const styles = StyleSheet.create({
  titreCarrousel: {
    fontSize: SIZES.h2,
    paddingVertical: 10,
  },
  carrouselContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: COLORS.primary,
    width: width - 40,
    borderRadius: 20,
    height: 280,
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
    flex: 1,
  },
  picture: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    borderRadius: 20,
  },
  info: {
    position: "absolute",
    flexDirection: "row",
    flexWrap: "wrap",
    height: 50,
    width: "100%",
    backgroundColor: "#cfcfcfe0",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-around",
    borderTopLeftRadius: 350,
    borderTopRightRadius: 350,
    bottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: -0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20.0,
  },
  prenom: {
    fontSize: SIZES.h4,
    textAlign: "center",
    textAlignVertical: "center",
    color: COLORS.white,
  },
  region: {
    fontSize: SIZES.h4,
    textAlign: "center",
    justifyContent: "center",
    color: COLORS.white,
  },
  espece: {
    fontSize: SIZES.h4,
    textAlign: "center",
    justifyContent: "center",
    color: COLORS.white,
  },
  textButton: {
    fontSize: SIZES.h2,
    color: "white",
  },
  textContainer: {
    height: "100%",
    justifyContent: "center",
  },
});
