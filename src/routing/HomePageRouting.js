import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AnimalBigScreen from "../components/animalAnnonceComponents/AnimalBigScreen";
import HomePage from "../screens/HomePage";

const Stack = createStackNavigator();

const HomePageRouting = ({ navigation, route }) => {
  return (
    <React.Fragment key="AccountPageNavigate">
      <Stack.Navigator
        mode="modal"
        screenOptions={{
          headerShown: false,
          presentation: "transparentModal",
        }}
      >
        <Stack.Screen
          headerMode="none"
          name="HomePage"
          component={HomePage}
          initialParams={{ navigation: navigation, routeLogin: route }}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            headerMode="none"
            name="AnimalBigScreen"
            component={AnimalBigScreen}
            initialParams={{ navigation: navigation, routeLogin: route}}
            options={{
              animationEnabled: true,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </React.Fragment>
  );
};

export default HomePageRouting;
