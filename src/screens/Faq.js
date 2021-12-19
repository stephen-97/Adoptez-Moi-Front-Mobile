import React from "react";
import { Container, Content } from "native-base";
import FaqPage from "../components/faqPageComponents/FaqPage";
import HeaderNav from "../navigation/HeaderNav";

const Faq = (props) => {
  return (
    <Container>
      <HeaderNav name="Foire aux questions"></HeaderNav>
      <Content contentContainerStyle={{ flex: 1 }}>
        <FaqPage navigation={props.navigation}></FaqPage>
      </Content>
    </Container>
  );
};

export default Faq;
