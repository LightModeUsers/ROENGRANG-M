import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { ModalStatus4 } from "../Components/Modal";
import {
  AddCartButton,
  CheckoutButton,
  Status0Button,
} from "../Components/Buttons";

const OrderDetail = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const orderId = route.params?.order_id;
  console.log(orderId);

  const [products, setProducts] = useState([]);
  const [dataVersion, setDataVersion] = useState(0);

  const [refresh, setRefresh] = useState(false);

  const status1 = async (proId1) => {
    try {
      const response = await fetch(
        `http://192.168.1.10:3000/status1/${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setRefresh(true);
      } else {
        Alert.alert("Failed", "Invalid User.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch data.");
    }
  };
  const status4 = async (proId4) => {
    try {
      const response = await fetch(
        `http://192.168.1.10:3000/status4/${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setRefresh(true);
      } else {
        Alert.alert("Failed", "Invalid User.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch data.");
    }
  };

  const QueryProducts = async () => {
    try {
      const result = await fetch(`http://192.168.1.10:3000/orders/${orderId}`, {
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
  }, [dataVersion, refresh]);

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

  const [showModal, setShowModal] = useState(false);

  const renderProduct = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.infoHeader}>
        <Text style={styles.name}>คำสั่งซื้อที่ #{item.id}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Image style={styles.image} source={{ uri: item.pro_img }} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.pro_name}</Text>
          <Text style={styles.price}>ราคา : {item.pro_price} บาท</Text>
          <Text style={styles.price}>จำนวน : {item.ord_amount}</Text>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>สถานะคำสั่งซื้อ</Text>
          <Text style={styles.price}>
            {(() => {
              switch (item.order_status) {
                case 0:
                  return "ส่งคำสั่งซื้อแล้ว";
                case 1:
                  return "ร้านค้าตอบรับคำสั่งซื้อแล้ว";
                case 2:
                  return "อยู่ระหว่างเตรียมสินค้า";
                case 3:
                  return "อยู่ระหว่างขนส่งสินค้า";
                case 4:
                  return "สินค้าถูกจัดส่งแล้ว";
                case 5:
                  return "คำสั่งซื้อสำเร็จแล้ว";
                case 6:
                  return "ยกเลิก";
              }
            })()}
          </Text>
        </View>
        <View>
          {(() => {
            switch (item.order_status) {
              case 0:
                return "";
              case 1:
                return (
                  <TouchableOpacity onPress={() => status1(item.pro_id)}>
                    <View style={styles.checkoutButton}>
                      <Text style={styles.buttonText}>ยืนยัน</Text>
                    </View>
                  </TouchableOpacity>
                );
              case 2:
                return "";
              case 3:
                return "";
              case 4:
                return (
                  <View>
                    <TouchableOpacity onPress={() => setShowModal(true)}>
                      <View style={styles.checkoutButton}>
                        <Text style={styles.buttonText}>ยืนยัน</Text>
                      </View>
                    </TouchableOpacity>
                    <ModalStatus4
                      visible={showModal}
                      onClose={() => {
                        setShowModal(false);
                      }}
                    />
                  </View>
                );
              case 5:
                return <Text>คำสั่งซื้อสำเร็จแล้ว</Text>;
              case 6:
                return <Text>ยกเลิก</Text>;
            }
          })()}
        </View>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>ยอดรวมคำสั่งซื้อ</Text>
          <View style={styles.itemContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.price}>ยอดรวม</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.price}>{item.sum_price} บาท</Text>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.price}>ค่าจัดส่ง</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.price}>{item.sent_price} บาท</Text>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.price}>ยอดรวมสุทธิ</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.price}>{item.total_price} บาท</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>ที่อยู่ในการจัดส่ง</Text>
        <View style={styles.info}>
          <Text style={styles.price}>ชื่อ : {item.ord_name}</Text>
          <Text style={styles.price}>เบอร์โทรศัพท์ : {item.ord_tel}</Text>
          <Text style={styles.price}>ที่อยู่ : {item.ord_name}</Text>
          <Text style={styles.price}>ถนน : {item.ord_soi}</Text>
          <Text style={styles.price}>ซอย : {item.ord_soi}</Text>
          <Text style={styles.price}>ตำบล/แขวง : {item.ord_subdistrict}</Text>
          <Text style={styles.price}>อำเภอ/เขต : {item.ord_district}</Text>
          <Text style={styles.price}>จังหวัด : {item.ord_province}</Text>
          <Text style={styles.price}>รหัสไปรษณีย์ : {item.ord_postID}</Text>
          <Text style={styles.price}>
            ตำแหน่งที่จัดส่ง : {item.ord_location}
          </Text>
          <Text style={styles.price}>หมายเหตุ : {item.ord_note}</Text>
        </View>
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

const styles = StyleSheet.create({
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
  priceA: {
    fontSize: 18,
    color: "#999",
    marginBottom: 20,
    alignItems: "center",
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
  checkoutButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    margin: 20,
    borderRadius: 5,
    width: 150,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default OrderDetail;
