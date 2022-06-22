import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AuthentificationRouting from "./AuthentificationRouting";
import AdminPageRouting from "./AdminPageRouting";
import SearchPageRouting from "./SearchPageRouting";
import AccountPageRouting from "./AccountPageRouting";
import HomePageRouting from "./HomePageRouting";
import Faq from "../screens/FaqScreen";
import DrawerContent from "./DrawerContent";

const SideMenu = () => {

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer theme={{ colors: { backgroundColor: "transparent" } }}>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props}/>}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen name="homePage" component={HomePageRouting} />
        <Drawer.Screen name="login" component={AuthentificationRouting} />
        <Drawer.Screen name="account" component={AccountPageRouting} />
        <Drawer.Screen name="admin" component={AdminPageRouting} />
        <Drawer.Screen name="search" component={SearchPageRouting} />
        <Drawer.Screen name="faq" component={Faq} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default SideMenu;
