import * as React from "react";
import { Provider } from "react-redux";
import { LogBox } from "react-native";
import Store from "./src/redux/reducers/store";
import SideMenu from "./src/navigation/SideMenu";

export default function App() {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);
  return (
    <Provider store={Store}>
      <SideMenu />
    </Provider>
  );
}
