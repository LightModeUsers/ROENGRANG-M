import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
  Image,
  Button,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import provinceData from "../assets/json/province.json";
import * as DocumentPicker from "expo-document-picker";
import { Buffer } from "buffer";
const ModalAccept = ({ visible, onClose }) => {
  console.log("prop", onClose);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [provinceset, setProvince] = useState("พระนครศรีอยุธยา");
  const [amphoeset, setAmphoe] = useState("บางประอิน");
  const [districtset, setDistrict] = useState("คุ้งลาน");
  const [zipcodeset, setZipcode] = useState("13160");
  const zipcodefilter = provinceData.filter(
    (item) => item.district === districtset
  );
  const districtfilter = provinceData.filter(
    (item) => item.amphoe === amphoeset
  );
  const amphoefilter = provinceData.filter(
    (item) => item.province === provinceset
  );
  const uniqueProvinces = new Set(provinceData.map((item) => item.province));
  const uniqueAmphoe = new Set(amphoefilter.map((item) => item.amphoe));
  const uniqueDistrict = new Set(
    districtfilter.map((setItem) => item.district)
  );
  const uniqueZipcode = new Set(zipcodefilter.map((item) => item.zipcode));

  const [imageData, setImageData] = React.useState(null);
  async function pickImageAsync() {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (result.type === "success") {
      console.log(result.uri);
      console.log(result.name);
      console.log(result.size);

      const base64String = await fileToBase64(result.uri);

      setImageData(base64String);
    }
  }
  function fileToBase64(uri) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result.split(",")[1]);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = reject;
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  }
  let uploadImage = async () => {
    const buffer = Buffer.from(
      imageData
        .replace("data:image/png;base64,", "")
        .replace("data:image/jpeg;base64,", ""),
      "base64"
    );
    const data = new FormData();
    data.append("user_email", username);
    data.append("user_password", password);
    data.append("user_fullname", name);
    data.append("user_img", imageData);
    // console.log(data);
    let res = await fetch("http://192.168.1.10:3000/upload", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    let responseJson = await res.json();
    if (responseJson.status == 1) {
      alert("upload success");
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={() => onClose()}
    >
      <ScrollView style={styles.modalContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.regisText}>status0</Text>
        {/* <UploadButton /> */}
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
        <Button title="Pick Image" onPress={pickImageAsync} />
        {imageData && (
          <Image
            source={{ uri: `data:image;base64,${imageData}` }}
            style={styles.image}
          />
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            uploadImage;
            onClose(), setName("");
            setUsername("");
            setGender("");
            setPassword("");
            setImageData();
          }}
        >
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
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 180,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 16,
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
export default ModalAccept;
