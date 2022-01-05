import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, Text, View, Image } from "react-native";
import { connect } from "react-redux";
import SERVER from "../../../config";
import MiniButton from "../utility/MiniButton";
import Line from "../utility/Line";
import { COLORS } from "../../constants";

const AnimalListToUser = (props) => {
  const [data, setData] = useState([]);

  const changeStoreAnimal = (value) => {
    const action = {
      type: "DELETE_ANIMAL_PROPS",
      dataAnimalforDeleting: value,
    };
    props.dispatch(action);
  };

  const sendData = () => {
    const formData = new FormData();
    return fetch(`http://${SERVER.NAME}/wanted/user/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: props.AuthProps.token,
      },
    })
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        if (jsonData.status === 200) {
          props.toggled(false);
        }
      });
  };

  const isVisible = useIsFocused();
  useEffect(() => {
    sendData();
  }, [isVisible, props.DeleteAnimalProps]);

  return (
    <>
      {data.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.textNoAnnonce}>Pas d'annonces postés</Text>
        </View>
      ) : null}
      {data.map((elem, i) => (
        <>
          <View style={styles.container} key={i}>
            <Image
              style={styles.image}
              source={{
                uri: `http://${SERVER.NAME}/upload/${elem.images[0].name}`,
              }}
            />
            <Text style={styles.text}>{elem.name}</Text>
            <MiniButton
              name="Supprimer"
              extraStyle={styles.buttonExtraStyle}
              onPress={() => changeStoreAnimal(elem)}
            />
          </View>
          <Line color="rgba(255,255,255,255.3)" />
        </>
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

export default connect(mapStateToProps)(AnimalListToUser);

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
    transform: [{translateY: -15}],
  },
  buttonExtraStyle: {
    position: "absolute",
    top: 40,
    transform: [{translateY: -20}],
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
