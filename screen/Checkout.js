import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { AddCartButton, CheckoutButton } from "../Components/Buttons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetail = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const proId = route.params?.pro_id;

  const [ord_amount, setAmount] = useState("");
  const [user_fullname, setFullname] = useState("");
  const [ord_tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [ord_road, setRoad] = useState("");
  const [ord_soi, setSoi] = useState("");
  const [ord_province, setProvince] = useState("");
  const [ord_district, setDistrict] = useState("");
  const [ord_subdistrict, setSubdistrict] = useState("");
  const [ord_postID, setPostId] = useState("");
  const [ord_location, setLocation] = useState("");
  const [ord_note, setNote] = useState("");
  const [products, setProducts] = useState([]);
  const [dataVersion, setDataVersion] = useState(0);
  const QueryProducts = async () => {
    try {
      const result = await fetch(`http://192.168.1.10:3000/products/${proId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    QueryProducts();
  }, [dataVersion]);

  
  const handleAddorder = async () => {
    const userDataString = await AsyncStorage.getItem("user");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userId = userData.user_id;
      const data = {
        proId,
        userId,
        ord_amount,
        user_fullname,
        ord_tel,
        address,
        ord_road,
        ord_soi,
        ord_province,
        ord_district,
        ord_subdistrict,
        ord_postID,
        ord_location,
        ord_note,
      };
      const response = await fetch("http://192.168.1.10:3000/order/add", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let responseJson = await response.json();
      if (responseJson.status == 1) {
        alert("upload success");
      }
    }
  };
  const renderProduct = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.infoHeader}>
        <Text style={styles.name}>รายการสินค้า</Text>
      </View>
      <View key={item.id} style={styles.itemContainer}>
        <Image style={styles.image} source={{ uri: item.pro_img }} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.pro_name}</Text>
          <Text style={styles.price}>{item.pro_price} บาท</Text>
          <View style={styles.inputViewHalf}>
            <TextInput
              style={styles.inputText}
              placeholder="จำนวน"
              placeholderTextColor="#003f5c"
              value={ord_amount}
              onChangeText={(text) => setAmount(text)}
            />
          </View>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>ที่อยู่ในการจัดส่ง</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="ชื่อ-นามสกุล"
            placeholderTextColor="#003f5c"
            value={user_fullname}
            onChangeText={(text) => setFullname(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="เบอร์โทรศัพท์"
            placeholderTextColor="#003f5c"
            value={ord_tel}
            onChangeText={(text) => setTel(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="ที่อยู่ หมู่"
            placeholderTextColor="#003f5c"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="ถนน"
            placeholderTextColor="#003f5c"
            value={ord_road}
            onChangeText={(text) => setRoad(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="ซอย"
            placeholderTextColor="#003f5c"
            value={ord_soi}
            onChangeText={(text) => setSoi(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="จังหวัด"
            placeholderTextColor="#003f5c"
            value={ord_province}
            onChangeText={(text) => setProvince(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="อำเภอ/เขต"
            placeholderTextColor="#003f5c"
            value={ord_district}
            onChangeText={(text) => setDistrict(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="ตำบล/แขวง"
            placeholderTextColor="#003f5c"
            value={ord_subdistrict}
            onChangeText={(text) => setSubdistrict(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="รหัสไปรษณีย์"
            placeholderTextColor="#003f5c"
            value={ord_postID}
            onChangeText={(text) => setPostId(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="ตำแหน่งที่อยู่ในการจัดส่ง"
            placeholderTextColor="#003f5c"
            value={ord_location}
            onChangeText={(text) => setLocation(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="หมายเหตุ"
            placeholderTextColor="#003f5c"
            value={ord_note}
            onChangeText={(text) => setNote(text)}
          />
        </View>
      </View>

      <View style={styles.rowContainer}>
        <CheckoutButton onPress={handleAddorder} />
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => item.pro_id.toString()}
    />
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingTop: 0,
    shadowColor: "#cccccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: "#fff",
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    aspectRatio: 1,
    margin: 20,
  },
  info: {
    padding: 20,
    paddingTop: 0,
  },
  infoHeader: {
    padding: 20,
    paddingBottom: 0,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "#999",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "100%",
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
  inputViewHalf: {
    width: "40%",
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    border: "1px solid #000",
    justifyContent: "space-evenly",
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
};

export default ProductDetail;
