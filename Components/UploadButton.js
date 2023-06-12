import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Buffer } from "buffer";

const UploadImageButton = () => {
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
    console.log(buffer);
    const image = buffer
    const data = new FormData();
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
      alert("Upload Successful");
    }
  };
  return (
    <View>
      <Button title="Pick Image" onPress={pickImageAsync} />
      {imageData && (
        <Image
          source={{ uri: `data:image;base64,${imageData}` }}
          style={Styles.image}
        />
      )}
      <TouchableOpacity onPress={uploadImage}>
        <Text style={Styles.text}>Click</Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  text: {
    textAlign: "center",
    paddingBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 16,
  },
});

export default UploadImageButton;
