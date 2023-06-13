import React, { useState } from "react";
import { Container, Content } from "native-base";

import LoginForm from "../components/authentificationComponents/LoginForm";
import HeaderNav from "../navigation/HeaderNav";

const Login = (props) => {
  return (
    <Container>
      <HeaderNav name="Connexion"></HeaderNav>
      <Content contentContainerStyle={{ flex: 1 }}>
        <LoginForm navigation={props.navigation}></LoginForm>
      </Content>
    </Container>
  );
};

export default Login;
