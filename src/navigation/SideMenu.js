import * as React from "react";
import { connect } from "react-redux";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";
import { icons, SIZES, COLORS } from "../constants";

import AuthentificationRouting from "../routing/AuthentificationRouting";
import AdminPageRouting from "../routing/AdminPageRouting";

import { ShowingScreen } from "./ShowingScreen";
import SliderImage from "../components/animalAnnonceComponents/SliderImage";
import SearchPageRouting from "../routing/SearchPageRouting";
import AccountPageRouting from "../routing/AccountPageRouting";
import HomePageRouting from "../routing/HomePageRouting";
import Faq from "../screens/Faq";
import { tokenDecode } from "../components/utility/functions";
import AdminPage from "../screens/AdminPage";

const Drawern = createDrawerNavigator();

const mapStateToProps = (state) => {
  return {
    NavProps: state.SendNavPropsReducer,
    AuthProps: state.AuthentificationReducer,
  };
};

function DrawerContent(props) {
  const changeStoreFilter = (data) => {
    const action = { type: "NAV_PROPS", navigationProps: data };
    React.useEffect(() => {
      props.dispatch(action);
    }, []);
  };
  changeStoreFilter(props.navigation);
  return (
    <Drawer.Section title=" " style={styles.drawer}>
      <View style={styles.drawerGlobalView}>
        <View style={styles.line}></View>

        <TouchableOpacity
          style={styles.touchableItems}
          onPress={() => {
            props.navigation.navigate("homePage");
          }}
        >
          <Text style={styles.size_text_nav_bar}>Accueil</Text>
          <Image style={styles.arrow_icon} source={icons.arrowFwd} />
        </TouchableOpacity>

        <View style={styles.line}></View>

        {props.AuthProps.token ? (
          <React.Fragment key={"authIsTrue"}>
            <TouchableOpacity
              style={styles.touchableItems}
              activeOpacity={1}
              onPress={() => {
                props.navigation.navigate("compte");
              }}
            >
              <Text style={styles.size_text_nav_bar}>Page de compte</Text>
              <Image style={styles.arrow_icon} source={icons.arrowFwd} />
            </TouchableOpacity>
            
            {tokenDecode(props.AuthProps.token).role.includes("ROLE_ADMIN") ? (
              <>
                <View style={styles.line}></View>
                <TouchableOpacity
                  style={styles.touchableItems}
                  activeOpacity={1}
                  onPress={() => {
                    props.navigation.navigate("admin");
                  }}
                >
                  <Text style={styles.size_text_nav_bar}>Page Admin</Text>
                  <Image style={styles.arrow_icon} source={icons.arrowFwd} />
                </TouchableOpacity>
              </>
            ) : null}
          </React.Fragment>
        ) : (
          <React.Fragment key={"authIsFalse"}>
            <TouchableOpacity
              style={styles.touchableItems}
              activeOpacity={1}
              onPress={() => {
                props.navigation.navigate("login");
              }}
            >
              <Text style={styles.size_text_nav_bar}>Connexion</Text>
              <Image style={styles.arrow_icon} source={icons.arrowFwd} />
            </TouchableOpacity>

          </React.Fragment>
        )}

        <View style={styles.line}></View>

        <TouchableOpacity
          style={styles.touchableItems}
          onPress={() => {
            props.navigation.navigate("search");
          }}
        >
          <Text style={styles.size_text_nav_bar}>Recherche</Text>
          <Image style={styles.arrow_icon} source={icons.arrowFwd} />
        </TouchableOpacity>

        <View style={styles.line}></View>

        <TouchableOpacity
          style={styles.touchableItems}
          onPress={() => {
            props.navigation.navigate("faq");
          }}
        >
          <Text style={styles.size_text_nav_bar}>FAQ</Text>
          <Image style={styles.arrow_icon} source={icons.arrowFwd} />
        </TouchableOpacity>

        <View style={styles.line}></View>
      </View>
    </Drawer.Section>
  );
}

const ConnectedDrawer = connect(mapStateToProps)(DrawerContent);

/** Fonction qui va appeler ShowingScreen et son contenu (header + content) à chaque click */

const AppDrawer = (props) => {
  return (
    <Drawern.Navigator
      drawerContent={(props) => <ConnectedDrawer {...props}/>}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawern.Screen name="homePage" component={HomePageRouting} />

      <Drawern.Screen name="login" component={AuthentificationRouting} />

      <Drawern.Screen name="compte" component={AccountPageRouting} />

      <Drawern.Screen name="admin" component={AdminPageRouting} />

      <Drawern.Screen name="search" component={SearchPageRouting} />

      <Drawern.Screen name="faq" component={Faq} />
    </Drawern.Navigator>
  );
};


const SideMenu = () => {
  return (
    <NavigationContainer theme={{colors: {backgroundColor: "transparent"}}}>
      <AppDrawer />
    </NavigationContainer>
  );
};

export default connect(mapStateToProps)(SideMenu);

const styles = StyleSheet.create({
  drawer: {
    borderBottomColor: "black",
    backgroundColor: COLORS.secondary,
    flex: 1,
    borderColor: "rgba(0,0,0,1)",
  },
  drawerGlobalView: {
    marginTop: 71,
    width: "100%",
    alignSelf: "stretch",
    textAlign: "center",
  },
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
  touchableItems: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  size_text_nav_bar: {
    fontSize: SIZES.h3,
    fontWeight: "bold",
    color: "gray",
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  arrow_icon: {
    height: 30,
    width: 30,
    position: "absolute",
    right: 20,
  },

  line: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
});
