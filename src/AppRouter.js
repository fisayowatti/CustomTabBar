import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import TabBar from "./components/TabBar";

const Tab = createBottomTabNavigator();
export default function AppRouter() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case "Home":
                iconName = "home";
                break;
              case "Search":
                iconName = "account-search";
                break;
              case "Favorites":
                iconName = "cards-heart";
                break;
              case "Profile":
                iconName = "account";
                break;
              default:
                return;
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={24}
                {...{ color }}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "#4F4F4F",
          inactiveTintColor: "#ddd",
          showLabelOnlyOnActive: false,
        }}
        tabBar={TabBar}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
