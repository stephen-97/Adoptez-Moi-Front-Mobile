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
import BottomMessage2 from "../utility/BottomMessage2";
import { tokenDecode, refreshToken } from "../utility/functions";
import LoaderSpinner from "../utility/LoaderSpinner";

const DeleteAccountView = (props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordEmpty, setCurrentPasswordEmpty] = useState(0);

  const [dataResponse, setDataResponse] = useState([]);
  const [clicked, setClickedValue] = useState(false);

  const sendData = () => {
    setClickedValue(true);
    const formData = new FormData();
    formData.append("email", tokenDecode(props.AuthProps.token).email);
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
        if (jsonData.status == 200) {
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
          {dataResponse.status == 200 ? (
            <View style={styles.content}>
              <Text style={styles.warningMsg}>
                {"\n"}
                Votre compte a été supprimer avec succès.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.goBack(null);
                  props.navigation.navigate("homePage");
                }}
                style={styles.buttonCreateAvis}
              >
                <Text style={styles.textButtonSucces}>OK</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {clicked ? (
                <View style={styles.content}>
                  <LoaderSpinner />
                </View>
              ) : (
                <View style={styles.content}>
                  <Text style={styles.warningMsg}>
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                      ATTENTION :
                    </Text>
                    {"\n"}
                    La suppression d'un compte est irréversible et entraînera la
                    perte de tout les animaux qui y sont liés
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
            </>
          )}
        </View>
      </View>
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
    backgroundColor: COLORS.secondary,
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
  },
  content: {
    padding: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
    fontSize: 20,
    paddingVertical: 15,
  },
  buttonCreateAvis: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: SIZES.padding2,
    backgroundColor: COLORS.tertiary,
    borderRadius: 5,
    margin: 20,
  },
  textButton: {
    fontSize: SIZES.h2,
    color: "white",
  },
  textButtonSucces: {
    fontSize: SIZES.h2,
    color: "white",
    width: 100,
    textAlign: "center",
  }
});
