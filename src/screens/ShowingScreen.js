import * as React from "react";
import { View } from "react-native";
import HeaderNav from "../navigation/HeaderNav";

export function ShowingScreen({ navigation, route }) {
  return (
    <>
      <HeaderNav name={route.params.name} navigation={navigation}></HeaderNav>
      <View style={{ flex: 1 }}>{route.params.content}</View>
    </>
  );
}
