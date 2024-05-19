import React, { useState, useEffect, useRef } from "react";
import { Text, Pressable, View, StyleSheet, Animated, PanResponder, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { ModalPortal } from "react-native-modals";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import Index from "./index";

const Stack = createStackNavigator();

export default function Layout() {
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const screenWidth = Dimensions.get('window').width;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => gestureState.x0 < screenWidth * 0.1,
      onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dx > 0 && gestureState.x0 < screenWidth * 0.1,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 0 && gestureState.dx < 200) {
          animation.setValue(gestureState.dx / 200);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 100) {
          setIsSidebarOpen(true);
        } else {
          setIsSidebarOpen(false);
        }
      },
    })
  ).current;

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
    outputRange: [-223, 0],
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
                <Text style={{ marginLeft: 10, fontSize: 30 }}>&#9776;</Text>
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
        {...panResponder.panHandlers}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "900" }}>TaskCore</Text>
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
            borderRadius: 10,
          }}
        >
          <MaterialIcons name="person" size={24} color="gray" />
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
              color: "red",
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
    width: 230,
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginTop: 40,
    shadowColor: "black",
  },
  closeButton: {
    textAlign: "right",
    fontSize: 20,
  },
});
