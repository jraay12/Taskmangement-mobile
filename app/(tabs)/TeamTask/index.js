import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  RefreshControl,
  ScrollView,
  Pressable,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import FlashMessage, { showMessage } from "react-native-flash-message";

const FirstPage = () => {
  const [data, setData] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false); 
  const [refreshing, setRefreshing] = useState(false); 
  const route = useRoute();
  const { id } = route.params || {};
  const isFocused = useIsFocused();
  const flashMessage = useRef(null);

  const fetchData = async () => {
    setRefreshing(true); 
    const token = await AsyncStorage.getItem("authToken");

    try {
      // change this url
      const response = await axios.get(`http://192.168.1.6:8000/api/all-task`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const task = response?.data;
      setData(task);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const filterTask = data?.data?.filter(
    (item) => item?.team_id === id && item?.status === "Pending"
  );

  const handlePress = (task) => {
    // Set the selected task and open the modal
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const SetStatus = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const taskId = selectedTask?._id;
    const status = "Done";
    const data = { status, taskId };

    try {
      // change this url
      await axios.put(`http://192.168.1.6:8000/api/edit-status`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData((prevData) =>
        prevData?.data?.filter((task) => task?._id !== taskId)
      );

      closeModal();

      showMessage({
        message: "Success!",
        description: "Task marked as done successfully",
        type: "success",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TEAM TASK</Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      >
        {filterTask && filterTask?.length > 0 ? (
          filterTask?.map((task) => (
            <TouchableOpacity
              key={task?._id}
              style={styles.taskContainer}
              onPress={() => handlePress(task)}
            >
              <View style={styles.box} >
                <Text style={styles.taskTitle}>{task?.title}</Text>
                <Text style={styles.taskDueDate}>{task?.dueDate}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.loadingText}>No Task For The Team</Text>
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedTask?.title}</Text>
            <View
              style={{
                display: "flex",
                width: "100%",
                borderWidth: 1,
                borderColor: "black",
                padding: 4,
                borderRadius: 3,
              }}
            >
              <Text style={{ fontWeight: "900" }}>Description:</Text>
              <Text style={styles.modalDescription}>
                {selectedTask?.description}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                width: "100%",
                borderWidth: 1,
                borderColor: "black",
                padding: 4,
                borderRadius: 3,
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontWeight: "900" }}>Due Date:</Text>
              <Text style={styles.modalDueDate}>{selectedTask?.dueDate}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 10,
              }}
            >
              <Pressable
                onPress={SetStatus}
                style={{
                  width: "100%",
                  backgroundColor: "blue",
                  padding: 6,
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
                  Complete Task
                </Text>
              </Pressable>
              <Pressable
                onPress={closeModal}
                style={{
                  width: "100%",
                  backgroundColor: "red",
                  padding: 6,
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
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <FlashMessage ref={flashMessage} position="bottom" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    color: "#841584",
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskTitle: {
    fontSize: 18,
    marginRight: 10,
    fontWeight: "bold",
  },
  taskDueDate: {
    fontSize: 16,
    color: "#666",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    fontWeight: "900",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#841584",
  },
  modalDescription: {
    fontSize: 18,
    marginLeft: 20,
  },
  modalDueDate: {
    fontSize: 16,
    marginBottom: 20,
    marginLeft: 20,
    color: "#666",
  },
});

export default FirstPage;
