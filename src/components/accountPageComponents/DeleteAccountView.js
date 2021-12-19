import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import SERVER from "../../../config";
import { COLORS, SIZES } from "../../constants";
import BottomMessage from "../utility/BottomMessage";
import { refreshToken } from "../utility/functions";

const DeleteAccountView = (props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordEmpty, setCurrentPasswordEmpty] = useState(0);

  const [dataResponse, setDataResponse] = useState([]);
  const [clicked, setClickedValue] = useState(false);

  const sendData = () => {
    const formData = new FormData();
    formData.append("email", props.AuthProps.email);
    formData.append("currentPassword", currentPassword);
    return fetch(`http://${SERVER.NAME}/login/authentification/deleteAccount`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((jsonData) => {
        setDataResponse(jsonData);
        setClickedValue(false);
        setClickedValue(true);
        if (jsonData.code) {
          const action = {
            type: "AUTH_PROPS",
            authentificationProps: { code: false },
          };
          props.dispatch(action);
        }
      });
  };

  const checkTextInput = () => {
    let i = 0;
    if (!currentPassword.trim()) {
      setCurrentPasswordEmpty(1);
    } else {
      setCurrentPasswordEmpty(0);
      i += 1;
    }
    if (i === 1) return true;
    return false;
  };

  const onPressCorrectPassword = () => {
    if (checkTextInput()) {
      sendData();
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.block}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => props.navigation.goBack(null)}
          >
            <Text style={styles.titleCloseButton}>Fermer</Text>
          </TouchableOpacity>
          {dataResponse.code ? (
            <View style={styles.content}>
              <Text style={[styles.warningMsg, { color: COLORS.correct }]}>
                {"\n"}
                Votre compte a été supprimé avec succès
              </Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.goBack(null);
                  props.navigation.navigate("home");
                }}
                style={styles.buttonCreateAvis}
              >
                <Text style={styles.textButton}>Ok</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.content}>
              <Text style={styles.warningMsg}>
                <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                  ATTENTION :
                </Text>
                {"\n"}
                La suppression d'un compte est irréversible et entraînera la
                perte de tout les avis qui y sont liés
              </Text>
              <TextInput
                placeholder="Entre votre mot de passe pour confirmation"
                style={
                  currentPasswordEmpty
                    ? styles.textInputIncorrect
                    : styles.textInput
                }
                onChangeText={(e) => setCurrentPassword(e)}
                onFocus={() => setCurrentPasswordEmpty(0)}
                secureTextEntry
              />
              <TouchableOpacity
                onPress={() => onPressCorrectPassword()}
                style={styles.buttonCreateAvis}
              >
                <Text style={styles.textButton}>Soumettre</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      {clicked ? (
        <BottomMessage
          message={dataResponse.message}
          height={-100}
          color={dataResponse.code ? COLORS.correct : COLORS.incorrect}
          click={setClickedValue}
        ></BottomMessage>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
  };
};
export default connect(mapStateToProps)(DeleteAccountView);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    backgroundColor: COLORS.primary,
    height: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
  },
  block: {
    backgroundColor: COLORS.lightGray2,
    width: "90%",
    alignSelf: "center",
    borderRadius: SIZES.borderRadius2,
    paddingBottom: 20,
  },
  content: {
    padding: 5,
    paddingHorizontal: 20,
  },
  closeButton: {
    padding: SIZES.padding,
    alignItems: "center",
    backgroundColor: COLORS.lightGray3,
    borderTopStartRadius: SIZES.borderRadius2,
    borderTopEndRadius: SIZES.borderRadius2,
  },
  titleCloseButton: {
    alignSelf: "center",
    color: "black",
    fontSize: SIZES.h2,
  },
  textInput: {
    padding: 15,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "white",
  },
  textInputIncorrect: {
    padding: 15,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "white",
  },
  warningMsg: {
    textAlign: "center",
    fontSize: 16,
    paddingVertical: 15,
  },
  buttonCreateAvis: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: SIZES.padding2,
    backgroundColor: COLORS.tertiary,
    borderRadius: 5,
    marginTop: 20,
  },
  textButton: {
    fontSize: SIZES.h2,
    color: "white",
  },
});
