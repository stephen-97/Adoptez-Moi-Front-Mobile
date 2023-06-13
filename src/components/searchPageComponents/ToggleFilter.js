// Example of Expandable ListView in React Native
// https://aboutreact.com/expandable-list-view/

// Import React
import React, { useState } from "react";
// Import required components
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  UIManager,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";

import Filter from "./Filter";

import { arrowFwd } from "../../constants/icons";
import { COLORS, SIZES } from "../../constants";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ToggleFiltre = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            setExpanded(!expanded);
            props.navigation.push("AnimalFilter");
          }}
          style={style.touchable_top}
        >
          <View style={style.touchable_container_text}>
            <Text style={style.touchable_top_text}>Filtre</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={style.curvedLine}></View>
      <View style={{ overflow: "visible", alignSelf: "stretch" }}>
      </View>
    </View>
  );
};

export default ToggleFiltre;

const style = StyleSheet.create({
  container: {
    minHeight: 70,
    alignItems: "center",
    width: "100%",
    zIndex: 1,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    position: "absolute",
  },
  container_listAndmap: {
    flex: 1,
    flexDirection: "row",
  },
  touchable_top: {
    height: "100%",
    overflow: "visible",
    width: 70,
  },

  touchable_container_text: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },

  header: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#98dfeb",
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    width: "100%",
    zIndex: 1,
  },
  curvedLine: {
    width: "20%",
    height: 50,
    position: "absolute",
    top: 10,
    left: "40%",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    backgroundColor: "#98dfeb",
    transform: [{ scaleX: 5 }, { scaleY: 1 }],
  },

  touchable_top_text: {
    fontSize: SIZES.h2,
    color: "rgb(85,85,85)",
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
    textAlign: "center",
  },

  hidden_content: {
    backgroundColor: "black",
    padding: 10,
    overflow: "hidden",
    alignSelf: "stretch",
    height: 300,
  },

  footer: {
    backgroundColor: "#383356",
    alignSelf: "stretch",
  },

  image: {
    height: 15,
    width: 15,
  },
  /**curvedLine: {
    width: "20%",
    height: 100,
    position: "absolute",
    bottom: -25,
    left: "40%",
    borderRadius: 35,
    backgroundColor: "black",
    transform: [{ scaleX: 5 }, { scaleY: 1 }],
  },**/
});


/**
 * 
 * // Example of Expandable ListView in React Native
// https://aboutreact.com/expandable-list-view/

// Import React
import React, { useState } from "react";
// Import required components
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  UIManager,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";

import Filter from "./Filter";

import { arrowFwd } from "../../constants/icons";
import { COLORS, SIZES } from "../../constants";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ToggleFiltre = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            setExpanded(!expanded);
            props.navigation.navigate("AnimalFilter");
          }}
          style={style.touchable_top}
        >
          <View style={style.touchable_container_text}>
            <Text style={style.touchable_top_text}>Filtre</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={style.curvedLine}></View>
      <View style={{ overflow: "visible", alignSelf: "stretch" }}>
        {expanded && (
          <View>
            <Filter></Filter>
          </View>
        )}
      </View>
    </View>
  );
};
 */