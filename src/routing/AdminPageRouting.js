import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DeleteAccountView from "../components/accountPageComponents/DeleteAccountView";
import AdminPage from "../screens/AdminPage";
import SelectedUserInfoView from "../components/adminPageComponents/SelectedUserInfoView";
import HeaderNav from "../navigation/HeaderNav";
import AdminDeleteUserAccount from "../components/adminPageComponents/AdminDeleteUserAccount";
import AnimalBigScreen from "../components/animalAnnonceComponents/AnimalBigScreen";
import AdminDeleteAnimal from "../components/adminPageComponents/AdminDeleteAnimal";

const Stack = createStackNavigator();

const AdminPageRouting = ({ navigation, route }) => {
  return (
    <React.Fragment key="AccountPageNavigate">
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          headerMode="none"
          name="AdminPage"
          component={AdminPage}
          initialParams={{ navigation: navigation, routeLogin: route}}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          headerMode="none"
          name="SelectedUserInfoForAdmin"
          component={SelectedUserInfoView}
          initialParams={{ navigation: navigation, routeLogin: route}}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
          <Stack.Screen
            headerMode="none"
            name="AdminDeleteUserAccount"
            component={AdminDeleteUserAccount}
            initialParams={{ navigation: navigation, routeLogin: route}}
            options={{
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            headerMode="none"
            name="AnimalDeleteAdmin"
            component={AdminDeleteAnimal}
            initialParams={{ navigation: navigation, routeLogin: route}}
            options={{
              animationEnabled: true,
            }}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            headerMode="none"
            name="AnimalBigScreenAdmin"
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

export default AdminPageRouting;
