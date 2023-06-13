import React, { useState } from "react";
import { Container, Content } from "native-base";
import { View, Text } from "react-native";
import HeaderNav from "../navigation/HeaderNav";
import AccountPageView from "../components/accountPageComponents/AccountPageView";

const Account = (props) => {
  return (
    <Container>
      <HeaderNav name="Compte"></HeaderNav>
      <Content contentContainerStyle={{ flex: 1 }}>
        <AccountPageView navigation={props.navigation} />
      </Content>
    </Container>
  );
};

export default Account;
