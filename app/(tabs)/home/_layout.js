import { createStackNavigator } from "@react-navigation/stack";
import { ModalPortal } from "react-native-modals";
import Index from "./index";
const Stack = createStackNavigator();

export default function Layout() {
  return (
    <>
      <ModalPortal />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" component={Index} />
      </Stack.Navigator>
    </>
  );
}
