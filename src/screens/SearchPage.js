import * as React from "react";
import { ScrollView, View } from "react-native";
import AnimalList2 from "../components/searchPageComponents/AnimalList";
import ToggleFilter from "../components/searchPageComponents/ToggleFilter";
import InputRange from "../components/utility/InputRange";
import HeaderNav from "../navigation/HeaderNav";

const SearchPage = ({ navigation }) => {
  return (
    <React.Fragment key="SearchPageScreen">
      <HeaderNav name="Recherche"></HeaderNav>
      <View style={{ backgroundColor: "white" }}>
        <ToggleFilter navigation={navigation}></ToggleFilter>
        <ScrollView style={{ height: "100%" }}>
          <AnimalList2 navigation={navigation}></AnimalList2>
        </ScrollView>
      </View>
    </React.Fragment>
  );
};

export default SearchPage;
