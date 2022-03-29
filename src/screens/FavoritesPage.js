import React, { useState, useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import { Container, Content, Right } from "native-base";
import HeaderBasic from "../navigation/HeaderBasic";
import FavoritePageView from "../components/accountPageComponents/FavoritePageView";

const FavoritesPage = (props) => {
  return (
    <Container style={{ borderRadius: 50 }}>
      <HeaderBasic name="Favoris" navigation={props.navigation} />
      <FavoritePageView navigation={props.navigation} />
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

export default FavoritesPage;
