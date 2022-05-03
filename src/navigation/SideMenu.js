import * as React from "react";
import { connect } from "react-redux";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Drawer } from "react-native-paper";
import { icons, SIZES, COLORS } from "../constants";

import AuthentificationRouting from "../routing/AuthentificationRouting";
import AdminPageRouting from "../routing/AdminPageRouting";

import SERVER from "../../config";
import { ShowingScreen } from "./ShowingScreen";
import AdminDeleteAnimal from "../components/adminPageComponents/AdminDeleteAnimal";
import SearchPageRouting from "../routing/SearchPageRouting";
import AccountPageRouting from "../routing/AccountPageRouting";
import HomePageRouting from "../routing/HomePageRouting";
import Faq from "../screens/Faq";
import { tokenDecode } from "../components/utility/functions";
import Line from "../components/utility/Line";
import AdminPage from "../screens/AdminPage";

const Drawern = createDrawerNavigator();
const Stack = createStackNavigator();

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

  const disconnect = () => {
    const action = {
      type: "AUTH_PROPS",
      authentificationProps: { code: false },
    };
    props.dispatch(action);
  };

  const userHaveNewMessages = () => {
    if (props.AuthProps.token) {
      if (tokenDecode(props.AuthProps.token).newMessages) return true;
    }
    return false;
  };

  return (
    <Drawer.Section title=" " style={styles.drawer}>
      <View
        style={
          props.AuthProps.token
            ? [styles.drawerGlobalViewConnected]
            : styles.drawerGlobalView
        }
      >
        {props.AuthProps.token ? (
          <TouchableOpacity
            style={{ height: 250 }}
            activeOpacity={1}
            onPress={() => {
              props.navigation.navigate("compte");
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              {tokenDecode(props.AuthProps.token).avatar ? (
                <Image
                  style={styles.avatar}
                  source={{
                    uri: `http://${SERVER.NAME}/avatar/${tokenDecode(props.AuthProps.token).avatar}`,
                  }}
                />
              ) : (
                <Image style={styles.avatar} source={icons.accountLogo} />
              )}
            </View>
            <View style={[styles.touchableItemsAccount]}>
              <Text style={[styles.size_text_nav_bar]}>Page de compte</Text>
              <Image style={styles.icon} source={icons.profile} />
              {userHaveNewMessages() ? <View style={styles.redPoint}></View> : null}
              <Image style={styles.arrow_icon} source={icons.arrowFwd} />
            </View>
          </TouchableOpacity>
        ) : null}

        <Line color="gray" />

        <TouchableOpacity
          style={styles.touchableItems}
          onPress={() => {
            props.navigation.navigate("homePage");
          }}
        >
          <Text style={styles.size_text_nav_bar}>Accueil</Text>
          <Image style={styles.icon} source={icons.home} />
          <Image style={styles.arrow_icon} source={icons.arrowFwd} />
        </TouchableOpacity>

        <Line color="gray" />

        {props.AuthProps.token ? (
          <React.Fragment key={"authIsTrue"}>
            {tokenDecode(props.AuthProps.token).role.includes("ROLE_ADMIN") ? (
              <>
                <TouchableOpacity
                  style={styles.touchableItems}
                  activeOpacity={1}
                  onPress={() => {
                    props.navigation.navigate("admin");
                  }}
                >
                  <Text style={styles.size_text_nav_bar}>Page Admin</Text>
                  <Image style={styles.arrow_icon} source={icons.arrowFwd} />
                  <Image style={styles.icon} source={icons.profile} />
                </TouchableOpacity>
                <Line color="gray" />
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
              <Image style={styles.icon} source={icons.profile} />
              <Image style={styles.arrow_icon} source={icons.arrowFwd} />
            </TouchableOpacity>

            <Line color="gray" />

          </React.Fragment>
        )}


        <TouchableOpacity
          style={styles.touchableItems}
          onPress={() => {
            props.navigation.navigate("search");
          }}
        >
          <Text style={styles.size_text_nav_bar}>Recherche</Text>
          <Image style={styles.icon} source={icons.magnifier} />
          <Image style={styles.arrow_icon} source={icons.arrowFwd} />
        </TouchableOpacity>

        <Line color="gray" />

        <TouchableOpacity
          style={styles.touchableItems}
          onPress={() => {
            props.navigation.navigate("faq");
          }}
        >
          <Text style={styles.size_text_nav_bar}>FAQ</Text>
          <Image style={styles.icon} source={icons.question} />
          <Image style={styles.arrow_icon} source={icons.arrowFwd} />
        </TouchableOpacity>

        <Line color="gray" />
      </View>
      {props.AuthProps.token ? (
        <Text
          style={styles.deconnexion}
          onPress={() => {
            disconnect();
            props.navigation.navigate("homePage");
          }}
        >
          Déconnexion
        </Text>
      ) : null}
    </Drawer.Section>
  );
}

const ConnectedDrawer = connect(mapStateToProps)(DrawerContent);

/** Fonction qui va appeler ShowingScreen et son contenu (header + content) à chaque click */

const AppDrawer = (props) => {
  return (
    <>
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
        <Stack.Screen
          headerMode="none"
          name="AdminDeleteAnimal"
          component={AdminDeleteAnimal}
          options={{
            headerShown: false,
            animationEnabled: true,
            cardStyle: { backgroundColor: "transparent" },
          }}
        />
    </>
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
  redPoint: {
    width: 12,
    height: 12,
    position: "absolute",
    backgroundColor: "red",
    zIndex: 1,
    borderRadius: 50,
    top: 7,
    left: 43,
  },
  drawerGlobalView: {
    marginTop: 71,
    width: "100%",
    alignSelf: "stretch",
    textAlign: "center",
  },
  drawerGlobalViewConnected: {
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
  touchableItemsAccount: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  size_text_nav_bar: {
    fontSize: SIZES.h3,
    fontWeight: "bold",
    color: "gray",
    alignSelf: "flex-start",
    marginLeft: 90,
  },
  deconnexion: {
    fontSize: SIZES.h2,
    fontWeight: "bold",
    color: COLORS.tertiary,
    position: "absolute",
    bottom: 50,
    width: "100%",
    textAlign: "center",
  },
  size_text_nav_bar_account: {
    position: "absolute",
    bottom: 20,
    fontSize: SIZES.h3,
    fontWeight: "bold",
    color: "gray",
    alignSelf: "flex-start",
    marginLeft: 90,
  },
  arrow_icon: {
    height: 30,
    width: 30,
    position: "absolute",
    right: 10,
  },
  icon: {
    height: 40,
    width: 40,
    position: "absolute",
    left: 20,
  },
  avatar: {
    height: 160,
    width: 160,
    borderRadius: 200,
    top: 25,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
});
