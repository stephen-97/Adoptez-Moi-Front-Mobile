import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Account";
import DeleteAccountView from "../components/accountPageComponents/DeleteAccountView";
import FormAnimal from "../screens/FormAnimal";

const Stack = createStackNavigator();

const AccountPageRouting = ({ navigation, route }) => {
  return (
    <React.Fragment key="AccountPageNavigate">
      <Stack.Navigator
        mode="modal"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          headerMode="none"
          name="Account"
          component={Account}
          initialParams={{ navigation: navigation, routeLogin: route}}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          headerMode="none"
          name="DeleteAccount"
          component={DeleteAccountView}
          initialParams={{ navigation: navigation, routeLogin: route}}
          options={{
            animationEnabled: true,
            cardStyle: { backgroundColor: "transparent" },
          }}
        />
        <Stack.Screen
          name="AnimalForm"
          component={FormAnimal}
          initialParams={{ navigation: navigation, routeLogin: route}}
          options={{
            animationEnabled: true,
            cardStyle: { backgroundColor: "transparent" },
          }}
        />
      </Stack.Navigator>
    </React.Fragment>
  );
};

export default AccountPageRouting;
