import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { COLORS, SIZES } from "../../constants";
import SERVER from "../../../config";
import BottomMessage2 from "../utility/BottomMessage2";
import { correctPassword } from "../utility/functions";
import { refreshToken } from "../utility/functions";
import { tokenDecode } from "../utility/functions";
import LoaderSpinner from "../utility/LoaderSpinner";

const ChangePassword = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const [passwordIsCorrect, setPasswordIsCorrect] = useState(1);
  const [newPasswordEmpty, setNewPasswordEmpty] = useState(0);
  const [newPassword2Empty, setNewPassword2Empty] = useState(0);
  const [currentPasswordEmpty, setCurrentPasswordEmpty] = useState(0);
  const [newPasswordsEquals, setNewPasswordEquals] = useState(1);

  const [dataResponse, setDataResponse] = useState([]);
  const [clicked, setClickedValue] = useState(false);

  const [loading, setLoading] = useState(false);

  let data = {
    user: "",
    email: "",
  };

  if (props.AuthProps.token) {
    data = tokenDecode(props.AuthProps.token);
  }

  const isVisible = useIsFocused();
  useEffect(() => {
    setNewPassword("");
    setNewPassword2("");
    setCurrentPassword("");
    setPasswordIsCorrect(1);
    setNewPasswordEmpty(0);
    setNewPassword2Empty(0);
    setCurrentPasswordEmpty(0);
    setNewPasswordEquals(1);
    setDataResponse([]);
    setClickedValue(false);
    setLoading(false);
  }, [isVisible]);
  const checkTextInput = () => {
    let i = 0;

    if (!newPassword.trim()) {
      setNewPasswordEmpty(1);
    } else {
      setNewPasswordEmpty(0);
      i += 1;
    }
    if (!newPassword2.trim()) {
      setNewPassword2Empty(1);
    } else {
      setNewPassword2Empty(0);
      i += 1;
    }
    if (!currentPassword.trim()) {
      setCurrentPasswordEmpty(1);
    } else {
      setCurrentPasswordEmpty(0);
      i += 1;
    }
    if (newPassword !== newPassword2) {
      setNewPasswordEquals(0);
    } else {
      setNewPasswordEquals(1);
      i += 1;
    }
    if (!correctPassword(newPassword)) {
      setPasswordIsCorrect(0);
    } else {
      setPasswordIsCorrect(1);
      i += 1;
    }
    if (i === 5) return true;
    return false;
  };

 
  const sendData = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("newPassword", newPassword);
    formData.append("currentPassword", currentPassword);
    return fetch(`http://${SERVER.NAME}/login/authentification/newPassword`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": props.AuthProps.token,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((jsonData) => {
        setDataResponse(jsonData);
        setLoading(false);
        setClickedValue(true);
        if (jsonData.code) {
          setTimeout(() => {
            props.toggled(false);
          }, 2000);
        }
      });
  };

  const onPressCorrectPassword = () => {
    if (checkTextInput()) {
      sendData();
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.helpingMessageContainer}>
          <Text style={styles.textHelpingMessage}>
            Le mot de passe doit contenir 8 caractère minimum, dont au moins un
            chiffre, une lettre et un caractère spécial.
          </Text>
        </View>
        <View style={styles.containerChildren}>
          <View style={styles.inputBlock}>
            <Text style={styles.inputTitle}>Nouveau mot de passe </Text>
            <TextInput
              placeholder="Votre mot de passe"
              style={
                newPasswordEmpty || !newPasswordsEquals || !passwordIsCorrect
                  ? styles.textInputIncorrect
                  : styles.textInput
              }
              onChangeText={(e) => setNewPassword(e)}
              onFocus={() => {
                setNewPasswordEmpty(0);
                setPasswordIsCorrect(1);
              }}
              secureTextEntry
              defaultValue={newPassword}
            />
            {newPasswordEmpty ? (
              <Text style={styles.warningMessage}>Le champ est vide</Text>
            ) : null}
            {!newPasswordsEquals ? (
              <Text style={styles.warningMessage}>Les deux mots de passe ne sont pas similaires</Text>
            ) : null}
            {!passwordIsCorrect ? (
              <Text style={styles.warningMessage}>Le mot de passe n'est pas conforme</Text>
            ) : null}
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputTitle}>Retappez votre nouveau mot de passe</Text>
            <TextInput
              placeholder="Votre mot de passe"
              style={
                newPassword2Empty || !newPasswordsEquals
                  ? styles.textInputIncorrect
                  : styles.textInput
              }
              onChangeText={(e) => setNewPassword2(e)}
              onFocus={() => setNewPassword2Empty(0)}
              secureTextEntry
              defaultValue={newPassword2}
            />
            {newPasswordEmpty ? (
              <Text style={styles.warningMessage}>Le champ est vide</Text>
            ) : null}
          </View>
        </View>

      

        <View style={styles.line}></View>

        <View style={styles.containerChildren}>
          <View style={styles.inputBlock}>
            <Text style={styles.inputTitle}>Composez votre mot de passe actuel</Text>
            <TextInput
              placeholder="Votre mot de passe"
              style={
                currentPasswordEmpty
                  ? styles.textInputIncorrect
                  : styles.textInput
              }
              onChangeText={(e) => setCurrentPassword(e)}
              onFocus={() => setCurrentPasswordEmpty(0)}
              secureTextEntry
              defaultValue={currentPassword}
            />
            {newPassword2Empty ? (
              <Text style={styles.warningMessage}>Le champ est vide</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.line}></View>
        <TouchableOpacity
          onPress={() => onPressCorrectPassword()}
          style={styles.buttonCreateAvis}
        >
          <Text style={styles.textButton}>Soumettre</Text>
        </TouchableOpacity>
        <View style={{ height: 20 }}></View>
        {loading ? <LoaderSpinner /> : null}
        {clicked ? (
          <BottomMessage2
            message={dataResponse.message}
            color={dataResponse.code}
            click={setClickedValue}
          />
        ) : null}
      </View>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
  };
};

export default connect(mapStateToProps)(ChangePassword);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGray4,
    paddingVertical: SIZES.padding2,
    width: "100%",
  },
  containerChildren: {
    marginVertical: 15,
  },
  inputBlock: {
    padding: 5,
    paddingHorizontal: 20,
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
  buttonCreateAvis: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: SIZES.padding2,
    backgroundColor: COLORS.tertiary,
    borderRadius: 5,
  },
  textButton: {
    fontSize: SIZES.h2,
    color: "white",
  },
  inputTitle: {
    marginLeft: 10,
    marginVertical: 5,
    fontSize: SIZES.h5,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  warningMessage: {
    color: "red",
    fontSize: 12,
    marginLeft: 15,
  },
  helpingMessageContainer: {
    padding: 5,
  },
  textHelpingMessage: {
    fontSize: 12,
    color: COLORS.darkgray,
  },
});
