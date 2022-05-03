import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AnimalBigScreen from "../components/animalAnnonceComponents/AnimalBigScreen";
import HomePage from "../screens/HomePage";
import SpeciesPageView from "../components/homePageComponents/SpeciesPageView";
import CommentBigScreen from "../components/animalAnnonceComponents/CommentBigScreen";
import AdminDeleteAnimal from "../components/adminPageComponents/AdminDeleteAnimal";

const Stack = createStackNavigator();

const HomePageRouting = ({ navigation, route }) => {
  return (
    <React.Fragment key="AccountPageNavigate">
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
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
          <Stack.Screen
            headerMode="none"
            name="CommentBigScreen"
            component={CommentBigScreen}
            options={{
              headerShown: false,
              animationEnabled: true,
              cardStyle: { backgroundColor: "transparent" },
            }}
          />
        </Stack.Group>
        <Stack.Screen
          headerMode="none"
          name="SpeciePage"
          component={SpeciesPageView}
          initialParams={{ navigation: navigation, routeLogin: route}}
          options={{
            animationEnabled: true,
          }}
        />
      </Stack.Navigator>
    </React.Fragment>
  );
};

export default HomePageRouting;
