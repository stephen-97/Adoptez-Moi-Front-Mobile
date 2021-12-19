import * as React from "react";
import { ScrollView, View } from "react-native";
import AdminPageView from "../components/adminPageComponents/AdminPageView";
import AnimalList2 from "../components/searchPageComponents/AnimalList";
import ToggleFilter from "../components/searchPageComponents/ToggleFilter";
import InputRange from "../components/utility/InputRange";
import HeaderNav from "../navigation/HeaderNav";

const AdminPage = ({ navigation }) => {
  return (
    <React.Fragment key="SearchPageScreen">
        <HeaderNav name="Page Admin"></HeaderNav>
      <AdminPageView navigation={navigation} />
    </React.Fragment>
  );
};

export default AdminPage;
