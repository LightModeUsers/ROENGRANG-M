import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";


const ShoppingCart = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('All')}
        style={styles.checkoutButton}
      >
        <Text style={styles.buttonText}>คำสั่งซื้อทั้งหมด</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('New')}
        style={styles.checkoutButton}
      >
        <Text style={styles.buttonText}>สั่งซื้อแล้ว</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Prepare')}
        style={styles.checkoutButton}
      >
        <Text style={styles.buttonText}>อยู่ระหว่างเตรียมจัดส่ง</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Ship')}
        style={styles.checkoutButton}
      >
        <Text style={styles.buttonText}>อยู่ละหว่างขนส่ง</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Shiped')}
        style={styles.checkoutButton}
      >
        <Text style={styles.buttonText}>คำสั่งซื้อที่ส่งแล้ว</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Success')}
        style={styles.checkoutButton}
      >
        <Text style={styles.buttonText}>คำสั่งซื้อที่สำเร็จ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Cancel')}
        style={styles.checkoutButton}
      >
        <Text style={styles.buttonText}>คำสั่งซื้อที่ยกเลิก</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  tittle: {
    fontSize: 24,
    marginBottom: 20,
  },
  checkoutButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    margin: 20,
    borderRadius: 5,
    width: 180,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    shadowColor: "#cccccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    color: "#888",
  },
  removeButton: {
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    marginRight: 10,
  },
});

export default ShoppingCart;
