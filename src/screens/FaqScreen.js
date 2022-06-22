import React from "react";
import FaqPage from "../components/faqPageComponents/FaqPage";
import HeaderNav from "../navigation/HeaderNav";

const Faq = (props) => {
  return (
    <>
      <HeaderNav name="Foire aux questions"></HeaderNav>
      <FaqPage navigation={props.navigation}></FaqPage>
    </>
  );
};

export default Faq;
