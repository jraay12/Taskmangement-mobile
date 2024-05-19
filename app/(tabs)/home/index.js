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
  const [category, setCategory] = useState("Work");
  const [refreshing, setRefreshing] = useState(false);

  const getUserTeams = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const email = await AsyncStorage.getItem("userEmail");
      const response = await axios.get(
        // change this URL
        `http://192.168.1.41:8000/api/user-team/${email}`,
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
      getUserTeams();
    }
  }, [isFocused, category]);

  const navigation = useNavigation();

  const handleRefresh = () => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
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
