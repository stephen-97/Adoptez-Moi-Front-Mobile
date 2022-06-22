import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import SERVER from "../../../config";
import Button from "./Button";
import LoaderSpinner from "./LoaderSpinner";

const ConfirmMessage = (props) => {
  const animValue = useRef(new Animated.Value(1000)).current;
  const [loading, setLoading] = useState(false);
  const [dataResponse, setDataResponse] = useState({ status: "" });
  
  const handleChange = () => {
    const action = {
      type: "DELETE_ANIMAL_PROPS",
      dataAnimalforDeleting: {},
    };
    props.dispatch(action);
  };

  React.useEffect(() => {
    Animated.timing(animValue, {
      toValue: 350,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animValue]);

  const resultMessage = () => {
    if (dataResponse.status === 200) {
      return "Votre annonce a été supprimé avec succès ! ";
    }
    return "Erreur serveur";
  };

  const deleteAnimal = () => {
    setLoading(true);
    return fetch(
      `http://${SERVER.NAME}/animal/delete/${props.DeleteAnimalProps.id}`,
      {
        method: "DELETE",
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
        setLoading(false);
      });
  };
  
  return (
    <View style={styles.miniWindowContainer}>
      <Animated.View style={[styles.miniWindow, { top: animValue }]}>
        <TouchableOpacity
          style={styles.miniWindowTouchable}
          onPress={() => handleChange()}
        >
          <Text style={{ fontSize: SIZES.h2, alignSelf: "center" }}>
            Fermer
          </Text>
        </TouchableOpacity>
        <View style={styles.miniWindowContent}>
          {dataResponse.status === "" ? (
            <>
              <Text style={styles.text}>
                Voulez vous vraiment supprimer l'annonce de {props.DeleteAnimalProps.name} ?
              </Text>
              <Button name="Supprimer" onPress={() => deleteAnimal()} />
            </>
          ) : (
            <View>
              {loading ? (
                <LoaderSpinner />
              ) : (
                <Text style={[styles.text, {color: COLORS.tertiary}]}>{resultMessage()}</Text>
              )}
            </View>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  miniWindowContainer: {
    zIndex: 100,
    position: "absolute",
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
    justifyContent: "center",
    position: "absolute"
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
  text: {
    fontSize: SIZES.h4,
    textAlign: "center",
    marginBottom: 20,
  },
});


const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
    DeleteAnimalProps: state.DeleteAnimalReducer,
  };
};

export default connect(mapStateToProps)(ConfirmMessage);
