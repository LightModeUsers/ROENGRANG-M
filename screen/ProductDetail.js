import { View, Text, ScrollView, Image, Button, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { AddCartButton, CheckoutButton } from "../Components/Buttons";
import { useNavigation } from '@react-navigation/native';

const ProductDetail = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const proId = route.params?.pro_id;

  const [products, setProducts] = useState([]);
  const [dataVersion, setDataVersion] = useState(0);

  const QueryProducts = async () => {
    try {
      const result = await fetch(`http://192.168.1.10:3000/products/${proId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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

  const renderProduct = ({ item }) => (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.pro_img }} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.pro_name}</Text>
        <Text style={styles.price}>{item.pro_price} บาท</Text>
        <Text style={styles.description}>{item.pro_detail}</Text>
      </View>
      <View style={styles.rowContainer}>
        <AddCartButton onPress={() => {}} />
        <CheckoutButton onPress={() => navigation.navigate("Checkout", { pro_id: item.pro_id })} />
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
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  info: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#999',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
};

export default ProductDetail;
