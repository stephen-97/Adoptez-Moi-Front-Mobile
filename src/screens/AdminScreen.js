import * as React from "react";
import AdminPageView from "../components/adminPageComponents/AdminPageView";
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
