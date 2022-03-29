import React, { useState, useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import { Container, Content, Right } from "native-base";
import HeaderBasic from "../navigation/HeaderBasic";
import MessagePageView from "../components/accountPageComponents/MessagePageView";

const UsersMessagesPage = (props) => {
  return (
    <Container style={{ borderRadius: 50 }}>
      <HeaderBasic name="Conversations" navigation={props.navigation} />
      <MessagePageView navigation={props.navigation} />
    </Container>
  );
};

const styles = StyleSheet.create({
  selectFormContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});

export default UsersMessagesPage;
