import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  FlatList,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const All = () => {
  const navigation = useNavigation();

  const checkout = () => {
    navigation.navigate("Cart");
  };
  const cart = () => {
    navigation.navigate("Cart");
  };

  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState(2);
  const [dataVersion, setDataVersion] = useState(0);

  const [order, setOrder] = useState([]);
  console.log(order);
  const QueryOrder = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("user");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const userId = userData.user_id;

        const response = await fetch(
          `http://192.168.1.10:3000/orderStatus/${userId}/5`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setOrder(data);
        } else {
          console.error("Request failed with status:", response.status);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    QueryOrder();
  }, [dataVersion]);

  const renderProduct = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate("OrderDetail", { order_id: item.id })}
    >
      <View style={styles.itemContainer}>
        <View style={styles.itemContainer}>
          <Image style={styles.image} source={{ uri: item.pro_img }} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{item.pro_name}</Text>
            <Text style={styles.price}>{item.pro_price} บาท</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const keyExtractor = (item, index) => `${item.pro_name}_${columns}`;

  return (
    <View style={styles.container}>
      <FlatList
        data={order}
        renderItem={renderProduct}
        keyExtractor={keyExtractor}
        numColumns={columns}
        scrollEnabled={false} // Set scrollEnabled to false
      />
    </View>
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
});

export default All;
