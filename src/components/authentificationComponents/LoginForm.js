import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import SERVER from "../../../config";
import { COLORS, SIZES } from "../../constants";
import LoaderSpinner from "../utility/LoaderSpinner";
import BottomMessage2 from "../utility/BottomMessage2";

const LoginForm = (props) => {
  const verificationValue = 2;

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [userEmpty, setUserEmpty] = useState(0);
  const [passwordEmpty, setPasswordEmpty] = useState(0);

  const [dataResponse, setDataResponse] = useState("");
  const [clicked, setClickedValue] = useState(false);
  const [loading, setLoading] = useState(false);

  const isVisible = useIsFocused();
  useEffect(() => {
    setUser("");
    setPassword("");
    setUserEmpty(0);
    setPasswordEmpty(0);
    setDataResponse([]);
    setClickedValue(false);
    setLoading(false);
  }, [isVisible]);

  const checkTextInput = () => {
    let i = 0;
    if (!user.trim()) {
      setUserEmpty(1);
    } else {
      setUserEmpty(0);
      i += 1;
    }
    if (!password.trim()) {
      setPasswordEmpty(1);
    } else {
      setPasswordEmpty(0);
      i += 1;
    }
    if (i === verificationValue) return true;
    return false;
  };

  const loginRequest = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("email", user);
    formData.append("password", password);
    return fetch(`http://${SERVER.NAME}/authentication`, {
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
        if (jsonData.status === 200) {
          changeStoreAuth(jsonData);
          props.navigation.navigate("homePage");
        }
      });
  };

  const changeStoreAuth = (data) => {
    const action = { type: "AUTH_PROPS", authentificationProps: data };
    props.dispatch(action);
  };

  const onPressCorrectLogin = () => {
    if (checkTextInput()) {
      loginRequest();
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.connect}>
        <View style={styles.connexionTitle}>
          <Text style={styles.connexionTitleText}>Se connecter</Text>
        </View>
        <View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              placeholder="Votre email"
              placeholderTextColor={COLORS.placeHolderColor}
              style={userEmpty ? styles.textInputIncorrect : styles.textInput}
              autoCapitalize="none"
              onChangeText={(e) => setUser(e)}
              onFocus={() => setUserEmpty(0)}
              defaultValue={user}
            />
            {userEmpty ? (
              <Text style={styles.warningMessage}>Le champ est vide</Text>
            ) : null}
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputTitle}>Mot de passe</Text>
            <TextInput
              placeholder="Votre mot de passe"
              placeholderTextColor={COLORS.placeHolderColor}
              style={
                passwordEmpty ? styles.textInputIncorrect : styles.textInput
              }
              onChangeText={(e) => setPassword(e)}
              onFocus={() => setPasswordEmpty(0)}
              defaultValue={password}
              secureTextEntry
            />
            {passwordEmpty ? (
              <Text style={styles.warningMessage}>Le champ est vide</Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.buttonCreateAvis}
            onPress={() => onPressCorrectLogin()}
          >
            <Text style={styles.textButtonForm}>Valider</Text>
          </TouchableOpacity>
          {loading ? <LoaderSpinner /> : null}
          {clicked ? (
            <BottomMessage2
              message={dataResponse.message}
              color={dataResponse.status}
              click={setClickedValue}
            />
          ) : null}
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttonSign}
        onPress={() => props.navigation.navigate("Registration")}
      >
        <Text style={styles.textSign}>Pas encore inscrit? Cliquez ici</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomMessage: {
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    height: "8%",
    width: "90%",
    top: "100%",
    borderRadius: 20,
    flex: 1,
    backgroundColor: "#fc4848",
  },
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
  textButtonForm: {
    fontSize: SIZES.h2,
    color: "white",
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
    margin: 10,
    marginBottom: 20,
    backgroundColor: COLORS.tertiary,
    borderRadius: 5,
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
  inputTitle: {
    marginLeft: 10,
    marginVertical: 10,
    color: "black",
    fontSize: SIZES.h5,
  },
  warningMessage: {
    fontSize: 12,
    color: "red",
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
    fontSize: SIZES.h4,
    textAlign: "center",
    color: "white",
    alignSelf: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
  };
};

export default connect(mapStateToProps)(LoginForm);
