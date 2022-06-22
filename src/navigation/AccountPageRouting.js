import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/AccountScreen";
import DeleteAccountView from "../components/accountPageComponents/DeleteAccountView";
import FormAnimal from "../screens/FormAnimalModalScreen";
import FavoritesPage from "../screens/FavoritesScreen";
import AnimalBigScreen from "../screens/AnimalModalScreen";
import UsersMessagesPage from "../screens/UsersMessagesScreen";
import CommentBigScreen from "../screens/CommentModalScreen";

const Stack = createStackNavigator();

const AccountPageRouting = ({ navigation, route }) => {
  return (
    <React.Fragment key="AccountPageNavigate">
      <Stack.Navigator
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
        <Stack.Screen
          name="FavoritesAnimals"
          component={FavoritesPage}
          initialParams={{ navigation: navigation, routeLogin: route}}
          options={{
            animationEnabled: true,
            cardStyle: { backgroundColor: "transparent" },
          }}
        />
        <Stack.Screen
          name="UsersMessages"
          component={UsersMessagesPage}
          initialParams={{ navigation: navigation, routeLogin: route}}
          options={{
            animationEnabled: true,
            cardStyle: { backgroundColor: "transparent" },
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
            name="CommentBigScreen"
            component={CommentBigScreen}
            options={{
              headerShown: false,
              animationEnabled: true,
              cardStyle: { backgroundColor: "transparent" },
            }}
        />
        </Stack.Group>
      </Stack.Navigator>
    </React.Fragment>
  );
};

export default AccountPageRouting;