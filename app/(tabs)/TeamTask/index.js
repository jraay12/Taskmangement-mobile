import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

const FirstPage = () => {
  const [data, setData] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // State to store the selected task
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const route = useRoute();
  const { id } = route.params || {};
  const isFocused = useIsFocused();

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("authToken");

    try {
      const response = await axios.get(`http://192.168.1.6:8000/api/all-task`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const task = response?.data;
      setData(task);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);
  console.log(data)

  const filterTask = data?.data?.filter((item) => item?.team_id === id && item?.status === "Pending");

  const handlePress = (task) => {
    // Set the selected task and open the modal
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    // Close the modal
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TEAM TASK</Text>
      {filterTask && filterTask.length > 0 ? (
        filterTask.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={styles.taskContainer}
            onPress={() => handlePress(task)}
          >
            <View style={styles.box}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskDueDate}>{task.dueDate}</Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedTask?.title}</Text>
            <Text style={styles.modalDescription}>
              {selectedTask?.description}
            </Text>
            <Text style={styles.modalDueDate}>{selectedTask?.dueDate}</Text>
            <Button title="Close" onPress={closeModal} color="#841584" />
          </View>
        </View>
      </Modal>
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
    marginBottom: 20,
    textAlign: "center",
  },
  modalDueDate: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
});

export default FirstPage;
