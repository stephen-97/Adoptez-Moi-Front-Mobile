import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Registration from "../screens/Registration";
import ConditionsUtilisation from "../components/utility/conditionsUtilisation";

const Stack = createStackNavigator();

const AuthentificationRouting = ({ navigation, route }) => {
  return (
    <React.Fragment key="AuthentificationNavigate">
      <Stack.Navigator
        mode="modal"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          headerMode="none"
          name="Login"
          component={Login}
          initialParams={{ navigation: navigation, routeLogin: route}}
          options={{
            animationEnabled: true,
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
