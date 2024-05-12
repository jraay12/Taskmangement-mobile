import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import axios from "axios";
import React, { useState } from "react";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation_password, setConfirmationPassword] = useState("");
  const [gender, setGender] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      gender: gender,
      password: password,
      confirmation_password: confirmation_password,
    };

    axios
      // change this url
      .post("http://192.168.1.6:8000/api/create-user", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered successfully"
        );
        setFirstname("");
        setLastname("");
        setEmail("");
        setGender("");
        setPassword("");
        setConfirmationPassword("");
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert(
          "Registration failed",
          "An error has occurred during registration"
        );
        console.log("error", error);
      });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 30, fontWeight: "900", color: "#0066b2" }}>
            Task Manager App
          </Text>
        </View>
        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: 600, marginTop: 20 }}>
              Register your account
            </Text>

            <View>
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
                <Ionicons
                  style={{ marginLeft: 8 }}
                  name="person"
                  size={24}
                  color="gray"
                />
                <TextInput
                  value={first_name}
                  onChangeText={(text) => setFirstname(text)}
                  style={{
                    color: "gray",
                    marginVertical: 10,
                    width: 300,
                    fontSize: email ? 17 : 17,
                  }}
                  placeholder="First Name"
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
                <Ionicons
                  style={{ marginLeft: 8 }}
                  name="person"
                  size={24}
                  color="gray"
                />
                <TextInput
                  value={last_name}
                  onChangeText={(text) => setLastname(text)}
                  style={{
                    color: "gray",
                    marginVertical: 10,
                    width: 300,
                    fontSize: email ? 17 : 17,
                  }}
                  placeholder="Last Name"
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
                <Ionicons
                  style={{ marginLeft: 8 }}
                  name="person"
                  size={24}
                  color="gray"
                />
                <Picker
                  selectedValue={gender}
                
                  style={{ height: 50, width: 300 }} 
                  onValueChange={(itemValue) => setGender(itemValue)}
                >
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
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
                    paddingLeft: 4,
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
                  value={confirmation_password}
                  secureTextEntry={true}
                  onChangeText={(text) => setConfirmationPassword(text)}
                  style={{
                    color: "gray",
                    marginVertical: 10,
                    width: 300,
                    fontSize: email ? 17 : 17,
                  }}
                  placeholder="Re-enter your password"
                />
              </View>
            </View>

            <View style={{ marginTop: 70 }} />

            <Pressable
              onPress={handleRegister}
              style={{
                width: 200,
                backgroundColor: "#6699CC",
                padding: 15,
                borderRadius: 6,
                marginLeft: "auto",
                marginRight: "auto",
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
                Register
              </Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Login")}
              style={{ marginTop: 15 }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  color: "gray",
                  marginBottom: 40,
                }}
              >
                Already have an account? Login here!
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({});
