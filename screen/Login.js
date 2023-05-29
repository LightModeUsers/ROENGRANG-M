import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModalRegister } from "../Components/Modal";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const addUser = () => {
    setShowModal(true);
  };
  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.1.10:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const userData = await response.json();
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Failed", "Invalid User.");
    }
  };
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.image} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.loginButton}>
            <Text style={styles.loginText}>LOGIN</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.regisButton}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={addUser}>
            <Text style={styles.regisText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalRegister
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    border: "1px solid #000",
    justifyContent: "center",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.01,
    shadowRadius: 11.14,
    elevation: 17,
  },
  inputText: {
    height: 50,
    fontSize: 18,
    color: "black",
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  loginButton: {
    backgroundColor: "#fb5b5a",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    marginTop: 20,
  },
  regisButton: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  regisText: {
    color: "#0099FF",
    fontSize: 16,
  },
  loginText: {
    color: "white",
    fontSize: 16,
  },
});

export default LoginScreen;
