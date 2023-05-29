import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { Card, Button, Icon } from "react-native-elements";

const ProductListScreen = () => {
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState(3);
  const [dataVersion, setDataVersion] = useState(0);
  console.log(users);

  const QueryUser = async () => {
    try {
      const result = await fetch("http://192.168.1.10:3000/products", {
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

  const renderProduct = ({ item }) => (
    <Card style={styles.card}>
      <Card.Image source={{ uri: "https://example.com/image.jpg" }} />

      <Card.Title>{item.pro_name}</Card.Title>

      <Text style={styles.price}>{item.pro_status} บาท</Text>
      <Button
        icon={<Icon name="shopping-cart" color="#ffffff" />}
        buttonStyle={styles.button}
        title="หยิบใส่ตะกร้า"
        onPress={() => {
          // โค้ดที่จะทำงานเมื่อกดปุ่ม
          // เพิ่มสินค้าลงในตะกร้าสินค้า
        }}
      />
    </Card>
  );

  const keyExtractor = (item, index) => `${item.pro_name}_${columns}`;

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderProduct}
        keyExtractor={keyExtractor}
        numColumns={columns}
      />
      <Button
        title="เปลี่ยนจำนวนคอลัมน์"
        onPress={() => {
          setColumns(columns === 3 ? 2 : 3);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    top: 100,
  },
  card: {
    flex: 1,
    margin: 8,
  },
  price: {
    // marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007bff",
  },
});

export default ProductListScreen;
