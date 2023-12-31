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
import LoaderSpinner from "../utility/LoaderSpinner";
import BottomMessage2 from "../utility/BottomMessage2";
import Button from "../utility/Button";

const AnimalDeleteAnimal = (props) => {
  const [dataResponse, setDataResponse] = useState({status: null});
  const isVisible = useIsFocused();
  const [touchable, setTouchable] = useState(false);
  const [responseBlock, setResponseBlock] = useState(false);
  const [message, setMessage] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {}, []);

  const animValue = useRef(new Animated.Value(-550)).current;
  const animValueOpacity = useRef(new Animated.Value(0)).current;

  const changeStoreAnimal = (value) => {
    const action = {
      type: "DELETE_ANIMAL_PROPS",
      dataAnimalforDeleting: value,
    };
    props.dispatch(action);
  };


  const deleteUserAnimal = () => {
    console.log("message");
    setIsLoading(true);
    return fetch(
      `http://${SERVER.NAME}/admin/animalDelete/${props.route.params.data.id}/${message}`,
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
        console.log(jsonData);
        setDataResponse(jsonData);
        setIsLoading(false);
        if (jsonData.status !== 400) {
          setResponseBlock(true);
        } else {
          setIsDeleted(true);
        }
      });
  };

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: 350,
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
    }).start(() => {
      if (isDeleted){
        changeStoreAnimal(props.route.params.data);
        return props.navigation.goBack(null);
      }
      return props.navigation.goBack(null);
    });
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
        <View style={styles.content}>
          {!isLoading ? (
            <>
              {dataResponse.status === 200 ? (
                <>
                  <Text style={styles.textSucces}>{dataResponse.message}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.title}>Motif de la suppression de l'annonce</Text>
                  <TextInput
                    maxLength={200}
                    style={styles.textAreaInput}
                    onChange={(e) => setMessage(e)}
                  ></TextInput>
                  <Button
                    name="Confirmer Suppresion"
                    extraStyle={{ marginBottom: 20 }}
                    onPress={() => deleteUserAnimal()}
                  />
                  {responseBlock ? (
                    <BottomMessage2 message={dataResponse.message} />
                  ) : null}
                </>
              )}
            </>
          ) : (
            <View style={styles.loaderContainer}>
              <LoaderSpinner />
            </View>
          )}
        </View>
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

export default connect(mapStateToProps)(AnimalDeleteAnimal);

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
    width: 350,
    alignSelf: "center",
    borderRadius: SIZES.borderRadius2,
    overflow: "hidden",
  },
  content: {
    justifyContent: "center",
    flex: 1,
    minHeight: 150,
  },
  miniWindowTouchable: {
    padding: 10,
    backgroundColor: COLORS.lightGray3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
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
    height: 50,
    backgroundColor: COLORS.lightGray3,
  },
  textSucces: {
    color: "red",
    alignSelf: "center",
    justifyContent: "center",
    fontSize: SIZES.h3,
  },
  loaderContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
