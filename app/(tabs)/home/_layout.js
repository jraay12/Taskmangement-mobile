import React, { useState, useEffect } from "react";
import { Text, Pressable, View, StyleSheet, Animated } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { ModalPortal } from "react-native-modals";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import Index from "./index";

const Stack = createStackNavigator();

export default function Layout() {
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isSidebarOpen) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0],
  });

  return (
    <>
      <ModalPortal />
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerLeft: false,
        }}
      >
        <Stack.Screen
          name="HOME"
          component={Index}
          options={{
            headerBackTitleVisible: true,
            headerTitle: null,
            headerLeftLabelVisible: true,
            headerBackTitle: "HELLO",
            headerLeft: () => (
              <Pressable onPress={toggleSidebar}>
                <Text style={{ marginLeft: 10, fontSize: 20 }}>&#9776;</Text>
              </Pressable>
            ),
          }}
        />
      </Stack.Navigator>
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: sidebarTranslateX }],
          },
        ]}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, color:"#FFFFFF"  }}>TaskCore</Text>
          <Pressable onPress={toggleSidebar}>
            <Text style={styles.closeButton}>&#9776;</Text>
          </Pressable>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            borderColor: "black",
            borderStyle: "solid",
            height: 50,
            borderBottomWidth: 2,
            marginTop: 100,
            backgroundColor: "#FFFFFF",
            borderRadius: 10
          }}
        >
          <MaterialIcons style={{}} name="person" size={24} color="gray" />
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
              }}
            >
              PROFILE
            </Text>
          </Pressable>
        </View>
        <View style={{ flexGrow: 1 }}></View>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "600",
              color: "red"
            }}
          >
            LOGOUT
          </Text>
        </Pressable>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 200,
    backgroundColor: "#6699CC",
    padding: 20,
    marginTop: 40,
  },
  closeButton: {
    color: "#FFFFFF",
    textAlign: "right",
    fontSize: 20,
    
  },
});
