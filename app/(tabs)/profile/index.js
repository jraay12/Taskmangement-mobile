import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation, useRoute } from "@react-navigation/native";

const Index = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  const userId = AsyncStorage.getItem("userId");
  const token = AsyncStorage.getItem("authToken");
  const firstname = AsyncStorage.getItem("userName");
  const lastname = AsyncStorage.getItem("userLastname");

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("authToken");
        const firstname = await AsyncStorage.getItem("userName");
        const lastname = await AsyncStorage.getItem("userLastname");

        // Set the state with the retrieved values
        setUserName(`${firstname} ${lastname}`);
        setUserEmail(""); // Replace "" with the actual email from your data

        const isLoginScreen = navigation
          .dangerouslyGetState()
          .routeNames.includes("Login");

        if (token && isLoginScreen) {
          navigation.navigate("Profile");
        }
      } catch (error) {
        console.log("Error fetching data from AsyncStorage:", error);
      }
    };

    fetchData();
  }, [isFocused]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("userName");
      await AsyncStorage.removeItem("userLastname");
      console.log("User has logged out of the account");
      setShowLogout(false);
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error logging out", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNNR9Nj4PTouXiAhhI_iJGOnexigCjuORQGc0mDvA1xw&s",
          }} // Placeholder image from website
          style={styles.profileImage}
          defaultSource={{
            uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fgoat&psig=AOvVaw0GOOwCnNvXUfb7yGjnO5sC&ust=1713460242169000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMiKhfreyYUDFQAAAAAdAAAAABAE",
          }} // Example placeholder picture
        />
        <Text style={styles.profileName}>{userName}</Text>
        <Text style={styles.profileBio}>
          I don't always test my code, but when I do, I do it in production.{" "}
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>0</Text>
        <Text style={styles.cardContent}>Pending Task</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>12</Text>
        <Text style={styles.cardContent}>Complete Task</Text>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profileBio: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
  profileDetails: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 20,
  },
  detailItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#00FFFF",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 40,

    marginBottom: 10,
    textAlign: "center",
  },
  cardContent: {
    fontSize: 16,
    textAlign: "right",
    fontWeight: "bold",
  },
});
