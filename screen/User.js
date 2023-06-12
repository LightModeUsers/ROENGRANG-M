import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EditButton, DeleteButton } from "../Components/Buttons";

const UserScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState({ visible: false, status: "" });
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [id, setID] = useState(null);
  const [dataVersion, setDataVersion] = useState(0);

  //query Article
  const QueryUser = async () => {
    try {
      const result = await fetch("http://192.168.1.10:3000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    QueryUser();
  }, [dataVersion]);

  const handleUpdate = (item) => {
    setID(item.id);
    setName(item.name);
    setUsername(item.username);
    setGender(item.gender);
    setPassword(item.password);
    setShowModal({ visible: true, status: "Edit" });
  };

  const handleDelete = (item) => {
    fetch(`http://192.168.1.10:3000/users/${item.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseData) => {
        const newData = users.filter((value) => value.id !== item.id);
        setUsers(newData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderUser = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.user_fullname}</Text>
      <EditButton onPress={() => handleUpdate(item)} />
      <DeleteButton onPress={() => handleDelete(item)} />
    </View>
  );
  const addUser = () => {
    setShowModal({ visible: true, status: "Add" });
  };
  const handleSubmitPUT = async (event) => {
    event.preventDefault();
    const newData = { name, username, gender };
    console.log("update", newData);
    try {
      const result = await fetch(`http://192.168.1.10:3000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      setLoading(false);
      setShowModal({ visible: false, status: "" });
      setName("");
      setUsername("");
      setGender("");
      setPassword("");
      setDataVersion(dataVersion + 1);
      Alert.alert("Success", "Update Success.");
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = { name, username, gender, password };
    try {
      const response = await fetch("http://192.168.1.10:3000/user/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      setUsers([...users, data]);
      setDataVersion(dataVersion + 1);
      Alert.alert("Success", "User has been added successfully.");
    } catch (error) {
      console.error(error);
    }
    setShowModal({ visible: false, status: "" });
    setName("");
    setUsername("");
    setGender("");
    setPassword("");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerCell}>Fullname</Text>
        <Text style={styles.headerCell}>Edit</Text>
        <Text style={styles.headerCell}>Delete</Text>
      </View>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={styles.addButton} onPress={addUser}>
        <Ionicons name="add-circle" size={64} color="#007AFF" />
      </TouchableOpacity>
      <Modal visible={showModal.visible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add User</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={gender}
            onChangeText={(text) => setGender(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={
              showModal.status === "Add" ? handleSubmit : handleSubmitPUT
            }
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setShowModal({ visible: false, status: "" }),
                setName(""),
                setUsername(""),
                setGender(""),
                setPassword("");
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#007AFF",
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
  headerCell: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default UserScreen;
