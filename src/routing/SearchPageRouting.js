import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AnimalBigScreen from "../components/animalAnnonceComponents/AnimalBigScreen";
import SearchPage from "../screens/SearchPage";
import CommentBigScreen from "../components/animalAnnonceComponents/CommentBigScreen";
import Filter2 from "../components/searchPageComponents/Filter2";

const Stack = createStackNavigator();

const SearchPageRouting = ({ navigation, route }) => {
  return (
    <React.Fragment key="SearchPageNavigator">
      <Stack.Navigator
        mode="modal"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          headerMode="none"
          name="Home"
          component={SearchPage}
          initialParams={{ navigation: navigation, route: route}}
        />
        <Stack.Screen
          headerMode="none"
          name="AnimalBigScreen"
          component={AnimalBigScreen}
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
        <Stack.Screen
          headerMode="none"
          name="AnimalFilter"
          component={Filter2}
          options={{
            headerShown: false,
            animationEnabled: true,
            cardStyle: { backgroundColor: "transparent" },
          }}
        />
      </Stack.Navigator>
    </React.Fragment>
  );
};

export default SearchPageRouting;
