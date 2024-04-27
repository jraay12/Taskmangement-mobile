import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          router.replace("/(tabs)/home");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        // change this URL
        "http://192.168.1.6:8000/api/login",
        user
      );
      const token = response.data.token;

      if (!token) {
        Alert.alert("Error", "Token is empty");
        return;
      }

      const userId = response.data.data.userId;
      const firstName = response.data.data.firstname;
      const email = response.data.data.email;

      const lastName = response.data.data.lastname;

      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("userId", userId);
      await AsyncStorage.setItem("userName", firstName);
      await AsyncStorage.setItem("userLastname", lastName);
      await AsyncStorage.setItem("userEmail", email);

      Alert.alert("Success", "You have successfully logged in");
      setEmail("");
      setPassword("");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", "Invalid credentials or Credentials not yet");
    }
  };


  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ marginTop: 80 }}>
        <Text style={{ fontSize: 30, fontWeight: "900", color: "#0066b2" }}>
          Task Manager App
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 20 }}>
            Log in to your account
          </Text>

          <View style={{ marginTop: 70 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#E0E0E0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="gray"
              />
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 17 : 17,
                }}
                placeholder="Enter your email"
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#E0E0E0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <AntDesign
                style={{ marginLeft: 8 }}
                name="lock"
                size={24}
                color="gray"
              />
              <TextInput
                value={password}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 17 : 17,
                }}
                placeholder="Enter your password"
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 12,
                justifyContent: "space-between",
              }}
            ></View>

            <View style={{ marginTop: 10 }} />

            <Pressable
              onPress={handleLogin}
              style={{
                width: "full",
                backgroundColor: "#6699CC",
                padding: 15,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Login
              </Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Register")}
              style={{ marginTop: 15 }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 15, color: "gray" }}
              >
                Don't have an account? Sign up!
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
