import * as React from "react";
import { Provider } from "react-redux";
import Store from "./src/redux/reducers/store";
import SideMenu from "./src/navigation/SideMenu";

export default function App() {
  return (
    <Provider store={Store}>
      <SideMenu />
    </Provider>
  );
}
