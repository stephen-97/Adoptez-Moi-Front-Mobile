import * as React from "react";
import { Container, Content } from "native-base";
import HeaderNav from "./HeaderNav";

export function ShowingScreen({ navigation, route }) {
  return (
    <Container>
      <HeaderNav name={route.params.name} navigation={navigation}></HeaderNav>
      <Content contentContainerStyle={{ flex: 1 }}>
        {route.params.content}
      </Content>
    </Container>
  );
}
