import React from "react";
import { View, StyleSheet } from "react-native";
import HeaderNav from "../navigation/HeaderNav";
import HomePageView from "../components/homePageComponents/HomePageView";

const HomePage = (props) => {
  return (
    <>
      <HeaderNav name="Accueil"></HeaderNav>
      <View style={styles.content}>
        <HomePageView navigation={props.navigation} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default HomePage;
