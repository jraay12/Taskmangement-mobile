import React, { useEffect, useState, useRef } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Button,
  Modal,
} from "react-native";
import {
  AntDesign,
  Ionicons,
  Entypo,
  Feather,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import {
  BottomModal,
  ModalContent,
  SlideAnimation,
  ModalTitle,
} from "react-native-modals";
import axios from "axios";
import moment from "moment";
import FlashMessage from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firstTimeLogin } from "../../(authenticate)/login";
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const today = moment().format("MMM Do");
  const [isModalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("All");
  const [todo, setTodo] = useState("");
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [hasLoggedInOnce, setHasLoggedInOnce] = useState(false);
  const [marked, setMarked] = useState(false);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [categoryTask, setCategoryTask] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    // Close date picker after selection
    setShow(false);
  };

  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const suggestions = [
    {
      id: "0",
      todo: "Go for a walk",
    },
    {
      id: "1",
      todo: "Go exercise",
    },
    {
      id: "2",
      todo: "Go shopping",
    },
    {
      id: "3",
      todo: "Go to bed early",
    },
    {
      id: "4",
      todo: "Hang out with friends",
    },
  ];

  const handleModal = () => {
    setModalVisible(!isModalVisible);
    console.log(isModalVisible);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const addTodo = async () => {
    // try {
    //   const userId = await AsyncStorage.getItem("userId"); // Retrieve userId from AsyncStorage
    //   const todoData = {
    //     userId: userId, // Assign userId to the todoData object
    //     title: todo,
    //     category: category,
    //   };
    //   await axios.post(
    //     https://task-db-rosy.vercel.app/todos/${userId},
    //     todoData
    //   );
    //   await getUserTodos();
    //   setTodo("");
    //   setModalVisible(false);
    // } catch (error) {
    //   console.log("error", error);
    // }
  };

  const getUserTodos = async () => {
    // try {
    //   const userId = await AsyncStorage.getItem("userId");
    //   const response = await axios.get(
    //     https://task-db-rosy.vercel.app/users/${userId}/todos
    //   );
    //   const fetchedTodos = response.data.todos || [];
    //   // Filter todos based on the selected category
    //   const filteredTodos = fetchedTodos.filter(
    //     (todo) => todo.category === category
    //   );
    //   // Filter pending and completed todos separately
    //   const pending = filteredTodos.filter(
    //     (todo) => todo.status !== "completed"
    //   );
    //   const completed = filteredTodos.filter(
    //     (todo) => todo.status === "completed"
    //   );
    //   setTodos(filteredTodos);
    //   setPendingTodos(pending);
    //   setCompletedTodos(completed);
    // } catch (error) {
    //   console.log("error", error);
    // }
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
      // Check if firstTimeLogin has occurred
      checkFirstTimeLogin(); // If not, call checkFirstTimeLogin
    }
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getUserTodos();
    }
  }, [isFocused, category, marked, isModalVisible]);

  const markTodoAsCompleted = async (todoId) => {
    // try {
    //   setMarked(true);
    //   await axios.patch(
    //     https://task-db-rosy.vercel.app/todos/${todoId}/complete
    //   );
    //   await getUserTodos();
    //   handleFlashMessage(
    //     "Task marked as completed!",
    //     "Task successfully marked as completed",
    //     "success"
    //   );
    // } catch (error) {
    //   console.log("error", error);
    // }
  };

  const handleDeleteTask = async (todoIdDelete) => {
    // try {
    //   await axios.delete(
    //     https://task-db-rosy.vercel.app/todos/${todoIdDelete}
    //   );
    //   await getUserTodos();
    //   handleFlashMessage(
    //     "Task Deleted!",
    //     "Task successfully deleted",
    //     "success"
    //   );
    // } catch (error) {
    //   console.log("Error deleting task:", error);
    // }
  };

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

  const firstTimeLogin = async () => {
    try {
      // Check if the flag indicating first-time login exists in AsyncStorage
      const isFirstTimeLogin = await AsyncStorage.getItem("firstTimeLogin");

      if (!isFirstTimeLogin) {
        // If it's the first time logging in, set the flag in AsyncStorage
        await AsyncStorage.setItem("firstTimeLogin", "true");
        // Perform actions for first-time login
        console.log("You've successfully logged in for the first time!");
      } else {
        // If it's not the first time logging in, perform actions accordingly
        handleFlashMessage(
          "Login!",
          "You have succesfully logged in",
          "success"
        );
      }
    } catch (error) {
      console.error("Error checking first-time login:", error);
    }
  };

  const handleAddTask = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const token = await AsyncStorage.getItem("authToken");
    const data = {
      user_id: userId,
      title: title,
      description: description,
      category: categoryTask,
      dueDate: date,
    };

    try {
      const response = await axios.post(
        `http://192.168.1.41:8000/api/add-task`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Clear input fields and close modal
      setTitle("");
      setDescription("");
      setCategoryTask("");
      setDate(new Date()); // Reset date to current date
      setModalVisible(false);

      // Show success message or perform any other action
      handleFlashMessage("Task Added!", "Task successfully added", "success");

      return response.data;
    } catch (error) {
      if (error.response) {
        console.log("Error response data:", error.response.data);
      }
    }
  };

  return (
    <>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Pressable
          onPress={() => {
            setCategory("All");
            getUserTodos();
          }}
          style={{
            backgroundColor: category === "All" ? "#7CB9E8" : "#FFFFFF",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: category === "All" ? "white" : "black",
              textAlign: "center",
            }}
          >
            All
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setCategory("Work");
            getUserTodos();
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
        <Pressable
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
        </Pressable>
        <Pressable onPress={() => setModalVisible(!isModalVisible)}>
          <AntDesign name="pluscircle" size={30} color="#007FFF" />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1, backgroundColor: "white", position: "relative" }}
      >
        <View style={{ padding: 10 }}>
          {todos?.length > 0 ? (
            <View>
              {pendingTodos?.length > 0 ? <Text>Task to do! {today}</Text> : ""}

              {pendingTodos?.map((item, index) => (
                <Pressable
                  style={{
                    backgroundColor: "#E0E0E0",
                    padding: 10,
                    borderRadius: 7,
                    marginVertical: 10,
                  }}
                  key={index}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Entypo
                      onPress={() => markTodoAsCompleted(item?._id)}
                      name="circle"
                      size={18}
                      color="black"
                    />
                    <Text style={{ flex: 1 }}>{item?.title}</Text>
                    <Feather
                      onPress={() => handleDeleteTask(item?._id)}
                      name="flag"
                      size={20}
                      color="black"
                    />
                  </View>
                </Pressable>
              ))}

              {completedTodos?.length > 0 ? (
                <View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    <Image
                      style={{ width: 200, height: 200, resizeMode: "contain" }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/6784/6784655.png",
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      marginVertical: 10,
                    }}
                  >
                    <Text>Completed Tasks</Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={24}
                      color="black"
                    />
                  </View>

                  {completedTodos?.map((item, index) => (
                    <Pressable
                      style={{
                        backgroundColor: "#E0E0E0",
                        padding: 10,
                        borderRadius: 7,
                        marginVertical: 10,
                      }}
                      key={index}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <FontAwesome name="circle" size={18} color="gray" />
                        <Text
                          style={{
                            flex: 1,
                            textDecorationLine: "line-through",
                            color: "gray",
                          }}
                        >
                          {item?.title}
                        </Text>
                        <Feather
                          onPress={() => handleDeleteTask(item?._id)}
                          name="flag"
                          size={20}
                          color="gray"
                        />
                      </View>
                    </Pressable>
                  ))}
                </View>
              ) : (
                ""
              )}
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
                No Tasks for today! Add a task
              </Text>
              <Pressable onPress={handleModal} style={{ marginTop: 15 }}>
                <AntDesign name="pluscircle" size={30} color="#007FFF" />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            console.warn("closed");
          }}
        >
          <View style={styles.View}>
            <Text style={styles.text}>Add Task</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#E0E0E0",
                paddingVertical: 1,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <TextInput
                style={{
                  color: "gray",
                  marginVertical: 0,
                  width: 300,
                  padding: 10,
                }}
                placeholder="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
                multiline={true}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                backgroundColor: "#E0E0E0",
                paddingVertical: 1,
                height: 100,
                borderRadius: 5,
                marginTop: 20,
              }}
            >
              <TextInput
                style={{
                  color: "gray",
                  marginVertical: 0,
                  width: 300,
                  padding: 10,
                  textAlignVertical: "top",
                }}
                placeholder="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
                multiline={true}
              />
            </View>
            <Text
              style={{
                width: "100%",
                marginTop: 20,
                marginBottom: 20,
                fontWeight: "900",
              }}
            >
              Category
            </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
                width: "100%",
              }}
            >
              <Button
                title="Personal"
                onPress={() => {
                  setCategoryTask("personal");
                }}
                color={categoryTask === "personal" ? "blue" : ""}
              />
              <Button
                title="Work"
                onPress={() => {
                  setCategoryTask("work");
                }}
                color={categoryTask === "work" ? "blue" : ""}
              />
            </View>
            <View style={{ width: "100%", marginTop: 20 }}>
              <Text
                style={{
                  width: "100%",
                  marginTop: 10,
                  marginBottom: 20,
                  fontWeight: "900",
                }}
              >
                Due Date
              </Text>
              <Button onPress={showDatepicker} title="Select due date" />
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}

            <View style={{ flexGrow: 1 }}></View>
            <View style={{ width: "100%" }}>
              <Button title="Add Task" onPress={handleAddTask} />
            </View>
            <View style={{ width: "100%" }}>
              <Button title="Close" onPress={handleCloseModal} />
            </View>
          </View>
        </Modal>
      </View>
      <FlashMessage ref={flashMessage} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  View: {
    height: "60%",
    width: "80%",
    alignItems: "center",
    backgroundColor: "#EFF4F6",
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    margin: 50,
    marginTop: 150,
  },
  text: {
    fontSize: 25,
    color: "blue",
  },
  button: {
    margin: 20,
    width: 200,
  },
});

export default Index;
