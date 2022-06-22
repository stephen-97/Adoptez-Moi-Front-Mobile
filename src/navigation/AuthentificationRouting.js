import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/LoginScreen";
import Registration from "../screens/RegistrationScreen";
import ConditionsUtilisation from "../components/utility/conditionsUtilisation";

const Stack = createStackNavigator();

const AuthentificationRouting = ({ navigation, route }) => {
  return (
    <React.Fragment key="AuthentificationNavigate">
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: "modal",
        }}
      >
        <Stack.Screen
          headerMode="none"
          name="Login"
          component={Login}
          initialParams={{ navigation: navigation, routeLogin: route}}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          initialParams={{ navigation: navigation, routeLogin: route}}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="ConditionUtilisation"
          component={ConditionsUtilisation}
          initialParams={{ navigation: navigation, routeLogin: route}}
          options={{
            animationEnabled: true,
          }}
        />
      </Stack.Navigator>
    </React.Fragment>
  );
};

export default AuthentificationRouting;
