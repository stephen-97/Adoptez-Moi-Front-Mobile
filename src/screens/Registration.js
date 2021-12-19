import React, { useState } from "react";
import { Container, Content } from "native-base";
import RegistrationForm from "../components/authentificationComponents/RegistrationForm";
import HeaderNav from "../navigation/HeaderNav";

const Registration = (props) => {
  return (
    <Container>
      <HeaderNav name="Connexion"></HeaderNav>
      <Content contentContainerStyle={{ flex: 1 }}>
        <RegistrationForm navigation={props.navigation}></RegistrationForm>
      </Content>
    </Container>
  );
};

export default Registration;
