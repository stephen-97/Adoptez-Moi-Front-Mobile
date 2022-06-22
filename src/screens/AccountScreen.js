import React from "react";
import HeaderNav from "../navigation/HeaderNav";
import AccountPageView from "../components/accountPageComponents/AccountPageView";

const Account = (props) => {
  return (
    <>
      <HeaderNav name="Compte"></HeaderNav>
      <AccountPageView navigation={props.navigation} />
    </>
  );
};

export default Account;
