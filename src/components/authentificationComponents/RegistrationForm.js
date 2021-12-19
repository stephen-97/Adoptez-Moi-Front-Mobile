import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { COLORS, SIZES } from "../../constants";
import SERVER from "../../../config";
import icons from "../../constants/icons";
import InfoMessage from "../utility/InfoMessage";
import BottomMessage2 from "../utility/BottomMessage2";
import LoaderSpinner from "../utility/LoaderSpinner";
import {
  correctPassword,
  correctEmail,
  correctUsername,
} from "../utility/functions";

const RegistrationForm = (props) => {
  const verificationValue = 9;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const [emailEmpty, setEmailEmpty] = useState(false);
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [emailIsCorrect, setEmailIsCorrect] = useState(true);
  const [usernameIsCorrect, setUsernameIsCorrect] = useState(true);

  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [password2Empty, setPassword2Empty] = useState(false);
  const [passwordsEquals, setPasswordEquals] = useState(true);
  const [correctPasswordState, setCorrectPassword] = useState(true);
  const [correctCheckbox, setCorrectCheckbox] = useState(true);

  const [dataResponse, setDataResponse] = useState([]);
  const [clicked, setClickedValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const isVisible = useIsFocused();

  useEffect(() => {
    setEmail("");
    setUsername("");
    setPassword("");
    setPassword2("");
    setEmailEmpty(false);
    setUsernameEmpty(false);
    setEmailIsCorrect(true);
    setUsernameIsCorrect(true);
    setPasswordEmpty(false);
    setPasswordEquals(true);
    setPassword2Empty(false);
    setPasswordEquals(true);
    setCorrectPassword(true);
    setDataResponse([]);
    setClickedValue(false);
    setLoading(false);
    setCheckbox(false);
  }, [isVisible]);

  const dataInfoMessage = [
    "* L'adresse email est unique et sera changeable",
    "* Le pseudo est unique et sera unchangeable",
    "* Le mot de passe doit être composer de 8 caractère minimum dont au moins une lettre, un chiffre et un caractère spécial",
    "* Vos information doivent rester strictement confidentiennels",
  ];

  const checkTextInput = () => {
    let i = 0;

    if (!email.trim()) {
      setEmailEmpty(true);
    } else {
      setEmailEmpty(false);
      i += 1;
    }
    if (!username.trim()) {
      setUsernameEmpty(true);
    } else {
      setUsernameEmpty(false);
      i += 1;
    }
    if (!password.trim()) {
      setPasswordEmpty(true);
    } else {
      setPasswordEmpty(false);
      i += 1;
    }
    if (!password2.trim()) {
      setPassword2Empty(true);
    } else {
      setPassword2Empty(false);
      i += 1;
    }
    if (password !== password2) {
      setPasswordEquals(false);
    } else {
      setPasswordEquals(true);
      i += 1;
    }
    if (correctEmail(email)) {
      i += 1;
    } else {
      setEmailIsCorrect(false);
    }
    if (correctUsername(username)) {
      i += 1;
    } else {
      setUsernameIsCorrect(false);
    }
    if (correctPassword(password)) {
      setCorrectPassword(true);
      i += 1;
    } else {
      setCorrectPassword(false);
    }
    if (checkbox) {
      setCorrectCheckbox(true);
      i += 1;
    } else {
      setCorrectCheckbox(false);
    }
    if (i === verificationValue) return true;
    return false;
  };

  const renderPasswordVerification = () => {
    if (passwordEmpty)
      return <Text style={styles.warningMessage}>Le champ est vide</Text>;
    if (!passwordsEquals)
      return (
        <Text style={styles.warningMessage}>
          Les mot de passes ne sont pas égaux
        </Text>
      );
    if (!correctPasswordState)
      return (
        <Text style={styles.warningMessage}>
          Le mot de passe n'est pas conforme
        </Text>
      );
    return null;
  };

  const renderEmailVerification = () => {
    if (!emailIsCorrect) {
      return (
        <Text style={styles.warningMessage}>
          L'adresse mail n'est pas conforme
        </Text>
      );
    }
  };

  const renderUserVerification = () => {
    if (!usernameIsCorrect) {
      return (
        <Text style={styles.warningMessage}>L'username n'est pas conforme</Text>
      );
    }
  };

  const sendData = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    return fetch(`http://${SERVER.NAME}/registration/new`, {
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
        setLoading(false);
        setClickedValue(true);
      });
  };

  const onPressCorrectLogin = () => {
    if (checkTextInput()) {
      sendData();
    }
  };

  const [helperStatue, setHelperStatue] = useState(false);
  const InterrogationPNG = () => {
    return (
      <TouchableHighlight
        style={styles.imageContainer}
        onPress={() =>
          helperStatue ? setHelperStatue(false) : setHelperStatue(true)
        }
      >
        <Image style={styles.imageNav} source={icons.interrogation} />
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.page}>
       {helperStatue ? (
            <InfoMessage onChange={setHelperStatue} message={dataInfoMessage} />
          ) : null}
      <View style={styles.connect}>
        <View style={styles.connexionTitle}>
          <Text style={styles.connexionTitleText}>Création d'un compte</Text>
        </View>
        <View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              placeholder="Votre email"
              style={emailEmpty ? styles.textInputIncorrect : styles.textInput}
              autoCapitalize="none"
              onChangeText={(e) => setEmail(e)}
              onFocus={() => {
                setEmailEmpty(false);
                setEmailIsCorrect(true);
              }}
            />
            {renderEmailVerification()}
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputTitle}>Nom d'utilisateur</Text>
            <TextInput
              placeholder="Votre pseudo"
              style={
                usernameEmpty ? styles.textInputIncorrect : styles.textInput
              }
              autoCapitalize="none"
              onChangeText={(e) => setUsername(e)}
              onFocus={() => {
                setUsernameEmpty(false);
                setUsernameIsCorrect(true);
              }}
            />
            {renderUserVerification()}
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputTitle}>Mot de passe</Text>
            <TextInput
              placeholder="Votre mot de passe"
              style={
                passwordEmpty || !passwordsEquals
                  ? styles.textInputIncorrect
                  : styles.textInput
              }
              onChangeText={(e) => setPassword(e)}
              onFocus={() => {
                setPasswordEmpty(false);
                setCorrectPassword(true);
              }}
              secureTextEntry
            />
            {renderPasswordVerification()}
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputTitle}>Retappez votre mot de passe</Text>
            <TextInput
              placeholder="Votre mot de passe"
              style={
                passwordEmpty || !passwordsEquals
                  ? styles.textInputIncorrect
                  : styles.textInput
              }
              onChangeText={(e) => setPassword2(e)}
              onFocus={() => setPassword2Empty(false)}
              secureTextEntry
            />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputTitle}>Conditions d'utilisation</Text>
            <View>
              <CheckBox
                checked={checkbox}
                onPress={() => {
                  setCheckbox(!checkbox);
                  setCorrectCheckbox(true);
                }}
                style={styles.checkbox}
              />
              <Text
                style={
                  correctCheckbox
                    ? styles.conditionText
                    : [styles.conditionText, { color: "red" }]
                }
                onPress={() => props.navigation.push("ConditionUtilisation")}
              >
                {`J'ai lu et j'accepte `}
                <Text style={{ color: COLORS.tertiary }}>
                  les conditions d'utilisation
                </Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonCreateAvis}
            onPress={() => (checkTextInput() ? onPressCorrectLogin() : null)}
          >
            <Text style={styles.textButtonForm}>Valider</Text>
          </TouchableOpacity>
          <InterrogationPNG></InterrogationPNG>
          {loading ? <LoaderSpinner /> : null}
          {clicked ? (
            <BottomMessage2
              message={dataResponse.message}
              color={dataResponse.code}
              click={setClickedValue}
            ></BottomMessage2>
          ) : null}
        </View>
      </View>
      {dataResponse.code !== "0" ? null : (
        <View style={styles.viewErrorMsg}>
          <Text style={styles.viewErrorText}>{dataResponse.message}</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.buttonSign}
        onPress={() => props.navigation.navigate("Login")}
      >
        <Text style={styles.textSign}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "white",
  },
  connect: {
    textAlign: "center",
    alignSelf: "center",
    backgroundColor: COLORS.lightGray3,
    borderRadius: 20,
    width: "90%",
  },
  connexionTitle: {
    //#a1dfe4
    backgroundColor: COLORS.secondary,
    padding: 10,
    overflow: "hidden",
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    width: "100%",
  },
  connexionTitleText: {
    fontSize: SIZES.h2,
    textAlign: "center",
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
  inputBlock: {
    padding: 5,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 20,
    marginVertical: 10,
    backgroundColor: COLORS.secondaryLight,
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 50,
    alignSelf: "center",
  },
  buttonCreateAvis: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: SIZES.padding2,
    marginBottom: 20,
    backgroundColor: COLORS.tertiary,
    borderRadius: 5,
  },
  textButtonForm: {
    fontSize: 20,
    color: "white",
  },
  inputTitle: {
    marginLeft: 10,
    marginVertical: 10,
    color: "black",
    fontSize: SIZES.h5,
  },
  warningMessage: {
    color: "red",
    fontSize: 12,
    marginLeft: 15,
  },
  buttonSign: {
    backgroundColor: COLORS.tertiary,
    top: "2.5%",
    height: 50,
    borderRadius: SIZES.borderRadius2,
    width: "80%",
    justifyContent: "center",
    alignSelf: "center",
  },
  textSign: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    alignSelf: "center",
  },
  viewErrorMsg: {
    position: "absolute",
    backgroundColor: "#f44c4c",
    height: 50,
    width: "50%",
    top: "80%",
    alignItems: "center",
    alignSelf: "center",
  },
  viewErrorText: {
    fontSize: 15,
    justifyContent: "center",
    alignSelf: "center",
    fontWeight: "bold",
  },
  imageContainer: {
    height: 40,
    width: 40,
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  imageNav: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  checkbox: {
    height: 20,
    width: 40,
    alignSelf: "center",
  },
  conditionText: {
    position: "absolute",
    top: 17,
    left: 50,
  },
});

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
  };
};

export default connect(mapStateToProps)(RegistrationForm);

/**
            {password2Empty ? (
              <Text style={styles.warningMessage}>Le champ est vide</Text>
            ) : null} */