import { createStackNavigator } from "@react-navigation/stack";
import { ModalPortal } from "react-native-modals";
import Index from "./index";

const Stack = createStackNavigator();

export default function Layout() {
  return (
    <>
      <ModalPortal />
      <Stack.Navigator screenOptions={{ headerShown: true, headerLeft: null, headerTitle: "TEAM TASK"}}>
        <Stack.Screen
          name="index"
          component={Index}
          options={{ headerBackVisible: false, headerLeft: null }}
        />
      </Stack.Navigator>
    </>
  );
}
