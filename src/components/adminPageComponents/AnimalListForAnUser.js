import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, Text, View, Image } from "react-native";
import { connect } from "react-redux";
import SERVER from "../../../config";
import MiniButton from "../utility/MiniButton";
import Line from "../utility/Line";
import { COLORS } from "../../constants";

const AnimalListForAnUser = (props) => {
  const [dataResponse, setDataResponse] = useState([]);

  const isVisible = useIsFocused();
  useEffect(() => {
    getAllAnimalFromThisUser();
  }, [isVisible, props.DeleteAnimalProps]);

  const getAllAnimalFromThisUser = () => {
    return fetch(
      `http://${SERVER.NAME}/admin/animalListUser/${props.data.id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: props.AuthProps.token,
        },
      }
    )
      .then((response) => response.json())
      .then((jsonData) => {
        setDataResponse(jsonData);
      });
  };

  return (
    <>
      {dataResponse.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.textNoAnnonce}>Pas d'annonces postés</Text>
        </View>
      ) : null}
      {dataResponse.map((elem, i) => (
        <View key={i.toString()}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{
                uri: `http://${SERVER.NAME}/upload/${elem.images[0].name}`,
              }}
            />
            <Text style={styles.text}>{elem.name}</Text>
            <MiniButton
              name="voir"
              extraStyle={styles.buttonExtraStyle}
              onPress={() => {
                props.navigation.navigate("AnimalBigScreenAdmin", {
                  data: elem,
                  navigation: props.navigation,
                });
              }}
            />
          </View>
          <Line color="rgba(255,255,255,255.3)" />
        </View>
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
    DeleteAnimalProps: state.DeleteAnimalReducer,
  };
};

export default connect(mapStateToProps)(AnimalListForAnUser);

const styles = StyleSheet.create({
  container: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    position: "absolute",
    top: 40,
    left: 100,
    transform: [{ translateY: -15 }],
  },
  buttonExtraStyle: {
    position: "absolute",
    top: 40,
    transform: [{ translateY: -20 }],
    right: 30,
  },
  image: {
    height: 60,
    width: 60,
    position: "absolute",
    top: 40,
    transform: [{translateY: -30}],
    left: 20,
    borderRadius: 50,
  },
  textNoAnnonce: {
    color: COLORS.darkgray,
    fontSize: 18,
  },
});


/**
 * 
 * {dataResponse.animals.map((elem) => (
        <>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{
                uri: `http://${SERVER.NAME}/upload/${elem.images[0].name}`,
              }}
            />
            <Text style={styles.text}>{elem.name}</Text>
            <MiniButton
              name="voir"
              extraStyle={styles.buttonExtraStyle}
              onPress={() => {
                props.navigation.navigate("AnimalBigScreen", {
                  data: elem,
                  navigation: props.navigation,
                });
              }}
            />
          </View>
          <Line color="rgba(255,255,255,255.3)" />
        </>
      ))}
 */
