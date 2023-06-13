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
import BottomMessage from "../utility/BottomMessage";
import { correctPassword, correctEmail } from "../utility/functions";

const ChangeEmailView = (props) => {
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const [newEmailEmpty, setNewEmailEmpty] = useState("");
  const [emailIsCorrect, setEmailIsCorrect] = useState(true);
  const [currentPasswordEmpty, setCurrentPasswordEmpty] = useState("");

  const [dataResponse, setDataResponse] = useState([]);
  const [clicked, setClickedValue] = useState(false);

  const isVisible = useIsFocused();
  useEffect(() => {
    setNewEmail("");
    setCurrentPassword("");
    setNewEmailEmpty("");
    setCurrentPasswordEmpty("");
    setEmailIsCorrect(true);
  }, [isVisible]);

  const checkTextInput = () => {
    let i = 0;
    if (!newEmail.trim()) {
      setNewEmailEmpty(1);
    } else {
      setNewEmailEmpty(0);
      i += 1;
    }
    if (!correctEmail(newEmail)) {
      setEmailIsCorrect(false);
    } else {
      setEmailIsCorrect(true);
      i += 1;
    }
    if (!currentPassword.trim()) {
      setCurrentPasswordEmpty(1);
    } else {
      setCurrentPasswordEmpty(0);
      i += 1;
    }
    if (i === 3) return true;
    return false;
  };

  const sendData = () => {
    const formData = new FormData();
    formData.append("email", props.AuthProps.email);
    formData.append("newEmail", newEmail);
    formData.append("password", currentPassword);
    return fetch(`http://${SERVER.NAME}/managerUser/newEmail`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((jsonData) => {
        props.dataResult(jsonData);
        props.clicked(true);
        if (jsonData.code) {
          props.toggled(false);
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
            Saissiez un nouvel email et votre mot de passe actuel
          </Text>
        </View>
        <View style={styles.containerChildren}>
          <View style={styles.inputBlock}>
            <Text style={styles.inputTitle}>Nouvel email </Text>
            <TextInput
              placeholder="Votre mot de passe"
              style={
                newEmailEmpty ? styles.textInputIncorrect : styles.textInput
              }
              onChangeText={(e) => setNewEmail(e)}
              onFocus={() => {
                setNewEmailEmpty(0);
              }}
              secureTextEntry
              defaultValue={newEmail}
            />
            {newEmailEmpty ? (
              <Text style={styles.warningMessage}>Le champ est vide</Text>
            ) : null}
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputTitle}>votre mot de passe</Text>
            <TextInput
              placeholder="Votre mot de passe"
              style={
                currentPassword ? styles.textInputIncorrect : styles.textInput
              }
              onChangeText={(e) => setCurrentPasswordEmpty(e)}
              onFocus={() => setCurrentPasswordEmpty(0)}
              secureTextEntry
              defaultValue={currentPassword}
            />
            {currentPasswordEmpty ? (
              <Text style={styles.warningMessage}>Le champ est vide</Text>
            ) : null}
          </View>
        </View>

        <TouchableOpacity
          onPress={() => onPressCorrectPassword()}
          style={styles.buttonCreateAvis}
        >
          <Text style={styles.textButton}>Soumettre</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
  };
};

export default connect(mapStateToProps)(ChangeEmailView);

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
