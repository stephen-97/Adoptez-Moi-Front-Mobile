import React from "react";
import { View } from "react-native";
import HeaderBasic from "../navigation/HeaderBasic";
import MessagePageView from "../components/accountPageComponents/MessagePageView";

const UsersMessagesPage = (props) => {
  return (
    <>
      <HeaderBasic name="Conversations" navigation={props.navigation} />
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <MessagePageView navigation={props.navigation} />
      </View>
    </>
  );
};

export default UsersMessagesPage;
