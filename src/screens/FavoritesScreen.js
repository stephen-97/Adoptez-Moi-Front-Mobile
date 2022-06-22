import React from "react";
import { View } from "react-native";
import HeaderBasic from "../navigation/HeaderBasic";
import FavoritePageView from "../components/accountPageComponents/FavoritePageView";

const FavoritesPage = (props) => {
  return (
    <>
      <HeaderBasic name="Favoris" navigation={props.navigation} />
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <FavoritePageView navigation={props.navigation} />
      </View>
    </>
  );
};

export default FavoritesPage;
