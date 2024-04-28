import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const Index = () => {
  const navigation = useNavigation();

  const [completedTasks, setCompletedTasks] = useState(0);
  const [total, setTotal] = useState(0);
  const [userName, setUserName] = useState(null);


  const isFocused = useIsFocused();
  const RetrieveAllTaskUser = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const email = await AsyncStorage.getItem("userEmail");
      const userId = await AsyncStorage.getItem("userId");

      const response = await axios.get(
        // change this url
        `http://192.168.1.6:8000/api/user-task/${userId}/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotal(response?.data?.totalCount);
      setCompletedTasks(response?.data?.totalDoneTask);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const firstname = await AsyncStorage.getItem("userName");
        const lastname = await AsyncStorage.getItem("userLastname");

        setUserName(`${firstname} ${lastname}`);
       
      } catch (error) {
        console.log("Error fetching data from AsyncStorage:", error);
      }
    };
    RetrieveAllTaskUser();
    fetchData();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNNR9Nj4PTouXiAhhI_iJGOnexigCjuORQGc0mDvA1xw&s",
          }} 
          style={styles.profileImage}
          defaultSource={{
            uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fgoat&psig=AOvVaw0GOOwCnNvXUfb7yGjnO5sC&ust=1713460242169000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMiKhfreyYUDFQAAAAAdAAAAABAE",
          }} 
        />
        <Text style={styles.profileName}>{userName}</Text>
        <Text style={styles.profileBio}>
          I don't always test my code, but when I do, I do it in production.{" "}
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{total}</Text>
        <Text style={styles.cardContent}>Total Task</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{completedTasks}</Text>
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
