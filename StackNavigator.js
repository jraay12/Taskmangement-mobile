// StackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./app/(authenticate)/login";
import Register from "./app/(authenticate)/Register";
import HomeScreen from "./app/(tabs)/home/_layout";
import Profile from "./app/(tabs)/profile/_layout";
import TeamTask from "./app/(tabs)/TeamTask/index";
const Stack = createStackNavigator();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: null, headerShown: false }}
      />
      <Stack.Screen
        name="TeamTask"
        component={TeamTask}
        options={{ headerTitle: null, headerShown: false }}
      />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerTitle: null, headerShown: false }}
      />
    </Stack.Navigator>
  );
};
