import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';

const ProductListScreen = () => {
  const navigation = useNavigation();

  const checkout = () => {
    navigation.navigate('Cart');
  };
  const cart = () => {
    navigation.navigate('Cart');
  };

  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState(2);
  const [dataVersion, setDataVersion] = useState(0);

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
    <View style={styles.containes}>
      <Pressable onPress={() => navigation.navigate("Detail", { pro_id: item.pro_id })}>
        <Card.Image
          width={100}
          style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
          source={{
            uri: item.pro_img,
          }}
        />
        <View style={styles.content}>
          <Text
            style={{
              width: 120,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {item.pro_name}
          </Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.price}>{item.pro_price} บาท</Text>
        </View>
      </Pressable>
    </View>
  );

  const keyExtractor = (item, index) => `${item.pro_name}_${columns}`;

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
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
    padding: 16,
    top: 100,
  },
  containes: {
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ECF0F1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    margin: 15,
  },
  content: {
    padding: 16,
    height: 100,
  },
  bottom: {
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
    padding: 10,
    justifyContent: "flex-end", // Positions content to the bottom
  },
});

export default ProductListScreen;
