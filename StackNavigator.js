// StackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./app/(authenticate)/login";
import Register from "./app/(authenticate)/Register";
import HomeScreen from "./app/(tabs)/home/_layout";
import Profile from "./app/(tabs)/profile/_layout"
const Stack = createStackNavigator();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={Profile} />

    </Stack.Navigator>
  );
};
