import React, { useEffect, useState, useRef } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Index = () => {
  const [team, setTeam] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("Work");

  const [hasLoggedInOnce, setHasLoggedInOnce] = useState(false);
  const [marked, setMarked] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getUserTodos = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("authToken");
      const email = await AsyncStorage.getItem("userEmail");
      // change this url
      const response = await axios.get(
        `http://192.168.1.6:8000/api/user-task/${userId}/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userTask = response?.data?.data;
      setTodo(userTask);

      const filteredTodos = userTask.filter(
        (todo) => todo.category === category
      );

      const pending = filteredTodos.filter(
        (todo) => todo.status !== "completed"
      );
      const completed = filteredTodos.filter(
        (todo) => todo.status === "completed"
      );

      setTodos(filteredTodos);
      setPendingTodos(pending);
      setCompletedTodos(completed);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    getUserData();

    const checkFirstTimeLogin = async () => {
      try {
        const isFirstTimeLogin = await AsyncStorage.getItem("firstTimeLogin");
        if (isFirstTimeLogin) {
          handleFlashMessage(
            "Success!",
            "You have successfully logged in",
            "success"
          );
        }
      } catch (error) {
        console.error("Error checking first-time login:", error);
      }
    };

    if (!hasLoggedInOnce) {
      checkFirstTimeLogin();
    }
  }, []);

  const getUserTeams = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const email = await AsyncStorage.getItem("userEmail");
      const response = await axios.get(
        `http://192.168.1.6:8000/api/user-team/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userTeam = response?.data;
      setTeam(userTeam);
    } catch (error) {
      console.log("error", error);
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getUserTodos();
      getUserTeams();
    }
  }, [isFocused, category, marked, isModalVisible]);

  const flashMessage = useRef();

  const handleFlashMessage = (message, description, type) => {
    flashMessage.current.showMessage({
      message,
      description,
      type,
      position: "bottom",
      style: {},
      icon: () => (
        <FontAwesome
          name="check-circle"
          size={24}
          color="white"
          style={{ paddingRight: 20, paddingTop: 14 }}
        />
      ),
    });
  };

  const navigation = useNavigation();

  const handleRefresh = () => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      getUserTodos();
      getUserTeams();
    });
  };

  return (
    <>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: "row",
          gap: 12,
        }}
      >
        <Pressable
          onPress={() => {
            setCategory("Work");
            getUserTeams();
          }}
          style={{
            backgroundColor: category === "Work" ? "#7CB9E8" : "#FFFFFF",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: category === "Work" ? "white" : "black",
              textAlign: "center",
            }}
          >
            Work
          </Text>
        </Pressable>
        {/* <Pressable
          onPress={() => {
            setCategory("Personal");
            getUserTodos();
          }}
          style={{
            backgroundColor: category === "Personal" ? "#7CB9E8" : "#FFFFFF",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginRight: "auto",
          }}
        >
          <Text
            style={{
              color: category === "Personal" ? "white" : "black",
              textAlign: "center",
            }}
          >
            Personal
          </Text>
        </Pressable> */}
      </View>

      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={{ padding: 10, backgroundColor: "white" }}>
          {team.teams?.length > 0 ? (
            <View>
              {team.teams?.length > 0 ? <Text>Your Teams</Text> : ""}

              {team.teams?.map((item, index) => (
                <Pressable
                  style={{
                    backgroundColor: "#E0E0E0",
                    padding: 10,
                    borderRadius: 7,
                    marginVertical: 10,
                  }}
                  onPress={() =>
                    navigation.navigate("TeamTask", { id: item?._id })
                  }
                  key={index}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Text style={{ flex: 1 }}>{item?.team_name}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 130,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Image
                style={{ width: 200, height: 200, resizeMode: "contain" }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/2387/2387679.png",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 15,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                No Teams for today!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    overflow: "scroll",
  },
  View: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#EFF4F6",
    borderWidth: 1,

    padding: 20,
  },
  text: {
    fontSize: 25,
    color: "blue",
    fontWeight: "900",
  },
  button: {
    margin: 20,
    width: 200,
  },
});

export default Index;
