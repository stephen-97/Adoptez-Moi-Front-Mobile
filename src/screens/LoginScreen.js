import React from "react";
import { View } from "react-native";
import LoginForm from "../components/authentificationComponents/LoginForm";
import HeaderNav from "../navigation/HeaderNav";

const Login = (props) => {
  return (
    <>
      <HeaderNav name="Connexion"></HeaderNav>
      <View style={{ flex: 1 }}>
        <LoginForm navigation={props.navigation}></LoginForm>
      </View>
    </>
  );
};

export default Login;
