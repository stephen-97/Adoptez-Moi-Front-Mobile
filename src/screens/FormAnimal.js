import React from "react";
import { Container, Content } from "native-base";
import HeaderBasic from "../navigation/HeaderBasic";
import AnimalFormView from "../components/accountPageComponents/AnimalFormView";

const FormAnimal = ({route, navigation}) => {
  return (
    <Container style={{ borderRadius: 50 }}>
      <HeaderBasic name="Formulaire" navigation={navigation} />
      <Content contentContainerStyle={{ flex: 1 }}>
        <AnimalFormView navigation={navigation} />
      </Content>
    </Container>
  );
};

export default FormAnimal;
