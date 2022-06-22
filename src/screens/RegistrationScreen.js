import React from "react";
import { View } from "react-native";
import RegistrationForm from "../components/authentificationComponents/RegistrationForm";
import HeaderNav from "../navigation/HeaderNav";

const Registration = (props) => {
  return (
    <>
      <HeaderNav name="Connexion"></HeaderNav>
      <View style={{ flex: 1 }}>
        <RegistrationForm navigation={props.navigation}></RegistrationForm>
      </View>
    </>
  );
};

export default Registration;
