import * as React from "react";
import { LogBox } from 'react-native';
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import Store from "./src/redux/reducers/store";
import SideMenu from "./src/navigation/SideMenu";

const App = () => {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
    "exported from 'deprecated-react-native-prop-types'.",
  ]);
  return (
    <Provider store={Store}>
      <SideMenu />
    </Provider>
  );
};

export default App;

//@react-native-picker/picker
//@react-native-community/datetimepicker

/**
 * réinstaller
 * "react-native-image-crop-picker": "^0.37.2",
   "react-native-image-picker": "^4.3.0",
   "@react-native-picker/picker": "^2.4.1",
   native-base
   @react-native-community/slider@"4.2.1"
 */
/**
 * 
 * métro:
 * module.exports = {
  transformer: {
    assetPlugins: ["expo-asset/tools/hashAssetFiles"],
  },
  resolver: {
    sourceExts: ['jsx','js','ts','tsx'] //add here
  },
};

 */