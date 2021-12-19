import { React } from "react-native";
import { connect } from "react-redux";
import * as SecureStore from 'expo-secure-store';
import jwt_decode from "jwt-decode";
import SERVER from "../../../config";

export const correctPassword = (pass) => {
  if (pass.toString().length < 8) return false;
  if (pass.toString().search(/[0-9]/) < 0) return false;
  if (pass.toString().search(/[a-z]/) < 0) return false;
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!format.test(pass)) return false;
  return true;
};

export const correctEmail = (email) => {
  const verification = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(verification)) {
    return true;
  }
  return false;
};

export const correctUsername = (user) => {
  if (user.length > 5 && user.length < 15) return true;
  return false;
};

export async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key) {
  const result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert('No values stored under that key.');
  }
};

export const tokenDecode = (token) => {
  return jwt_decode(token);
};

export const convertDateTime = (date) => {
  return date.split(" ")[0];
};

export const refreshToken = (props) => {
  const changeStoreAuth = (data) => {
    const action = { type: "AUTH_PROPS", authentificationProps: data };
    props.dispatch(action);
  };
  fetch(`http://${SERVER.NAME}/login/authentification/refreshToken`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": props.AuthProps.token,
    },
  })
    .then((response) => response.json())
    .then((jsonData) => {
      if (jsonData.status !== false) {
        changeStoreAuth(jsonData);
      } else {
        changeStoreAuth([]);
        props.navigation.navigate("homePage");
      }
    });
};

export const responseManager = (response, props) => {
  if (response !== undefined) {
    if (response.status === 401) {
      props.navigation.navigate("homePage");
    }
  }
};

export const convertDBDate = (date) => {
  const dateTab = date.split("-");
  const mois = [
    "Janvier",
    "Février",
    "Septembre",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  return `${dateTab[2]} ${mois[dateTab[1] - 1]} ${dateTab[0]}`;
}

export const convertDate = (date) => {
  const dateTab = date.split("-");
  return `${dateTab[2].substring(0, 2)} / ${dateTab[1]} / ${dateTab[0]}`;
}
//export default connect(mapStateToProps)(refreshToken);
