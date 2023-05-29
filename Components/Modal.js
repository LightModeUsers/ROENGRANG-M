import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import React, { useState } from "react";
import provinceData from "../assets/json/province.json";

const ModalRegister = ({ visible, onClose }) => {
  console.log("prop", onClose);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [provinceset, setProvince] = useState('พระนครศรีอยุธยา')
    const [amphoeset, setAmphoe] = useState('บางประอิน')
    const [districtset, setDistrict] = useState('คุ้งลาน')
    const [zipcodeset, setZipcode] = useState('13160')
  const zipcodefilter = provinceData.filter((item) => item.district === districtset)
    const districtfilter = provinceData.filter((item) => item.amphoe === amphoeset)
    const amphoefilter = provinceData.filter((item) => item.province === provinceset)
    const uniqueProvinces = new Set(provinceData.map((item) => item.province));
    const uniqueAmphoe = new Set(amphoefilter.map((item) => item.amphoe));
    const uniqueDistrict = new Set(districtfilter.map((setItem) => item.district));
    const uniqueZipcode = new Set(zipcodefilter.map((item) => item.zipcode));
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = { name, username, gender, password };
    try {
      const response = await fetch("http://192.168.1.41:3000/user/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      Alert.alert("Success", "สมัครสมาชิกสำเร็จ");
    } catch (error) {
      console.error(error);
    }
    onClose();
    setName("");
    setUsername("");
    setGender("");
    setPassword("");
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={() => onClose()}
    >
      <View style={styles.modalContainer}>
        <Image source={require("../assets/logo.png")} style={styles.image} />
        <Text style={styles.regisText}>สมัครสมาชิก</Text>
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
        
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonCancel}
          onPress={() => {
            onClose(), setName("");
            setUsername("");
            setGender("");
            setPassword("");
          }}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 200,
    marginLeft: 100,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  regisText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#55FF00",
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonCancel: {
    backgroundColor: "#E74C3C",
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

export { ModalRegister };
