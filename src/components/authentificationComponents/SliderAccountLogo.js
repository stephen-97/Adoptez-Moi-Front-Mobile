import React, { useRef } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  UIManager,
  Platform,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { SIZES } from "../../constants";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SliderAccountLogo = (props) => {
  const animValue = useRef(new Animated.Value(0)).current;
  const closeToggle = false;

  const changeStoreAuth = () => {
    const action = { type: "AUTH_PROPS", authentificationProps: { code: false } };
    props.dispatch(action);
  };

  React.useEffect(() => {
    Animated.timing(animValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [animValue]);

  return (
    <Animated.View style={[props.style, { opacity: animValue }]}>
      <TouchableOpacity
        style={styles.touchableItems}
        onPress={() => {
          props.navigation.navigate("compte");
        }}
      >
        <Text style={styles.size_text_nav_bar}>Créer un avis</Text>
      </TouchableOpacity>

      <View style={styles.line}></View>

      <TouchableOpacity
        style={styles.touchableItems}
        onPress={() => {
          changeStoreAuth();
          props.navigation.navigate("homePage");
          props.toggled(closeToggle);
        }}
      >
        <Text style={styles.size_text_nav_bar}>Déconnexion</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
  };
};

export default connect(mapStateToProps)(SliderAccountLogo);

const styles = StyleSheet.create({
  bottomMessage: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: "90%",
  },
  size_text_nav_bar: {
    fontSize: SIZES.h4,
    alignSelf: "center",
    fontWeight: "bold",
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  sliderContainer: {
    width: 300,
    height: 200,
    backgroundColor: "red",
    borderWidth: 5,
  },
  touchableItems: {
    padding: 10,
  },
});
