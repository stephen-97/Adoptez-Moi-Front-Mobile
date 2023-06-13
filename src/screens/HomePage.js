import React from "react";
import { Container, Content } from "native-base";
import HeaderNav from "../navigation/HeaderNav";
import HomePageView from "../components/homePageComponents/HomePageView";

const HomePage = (props) => {
  return (
    <Container>
      <HeaderNav name="Acceuil"></HeaderNav>
      <Content contentContainerStyle={{ flex: 1 }}>
        <HomePageView navigation={props.navigation} />
      </Content>
    </Container>
  );
};

export default HomePage;
