import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const items = [
  {
    id: 1,
    name: "Item 1",
    price: "$10",
    quantity: 1,
    image: "https://www.bootdey.com/image/280x280/00FFFF/000000",
  },
  {
    id: 2,
    name: "Item 2",
    price: "$20",
    quantity: 1,
    image: "https://www.bootdey.com/image/280x280/FF00FF/000000",
  },
  {
    id: 3,
    name: "Item 3",
    price: "$30",
    quantity: 1,
    image: "https://www.bootdey.com/image/280x280/FF7F50/000000",
  },
];

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState(items);
  const [user, setUser] = useState(null);
  console.log(user?.user_id);
  useEffect(() => {
    const getUserData = async () => {
      const userData = await AsyncStorage.getItem("user");
      setUser(JSON.parse(userData));
    };
    getUserData();
  }, []);
  const addItem = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeItem = (item) => {
    setCartItems(cartItems.filter((i) => i !== item));
  };

  const increaseQuantity = (item) => {
    const newCartItems = cartItems.map((i) => {
      if (i === item) {
        return { ...i, quantity: i.quantity + 1 };
      }
      return i;
    });
    setCartItems(newCartItems);
  };

  const decreaseQuantity = (item) => {
    const newCartItems = cartItems.map((i) => {
      if (i === item && i.quantity > 1) {
        return { ...i, quantity: i.quantity - 1 };
      }
      return i;
    });
    setCartItems(newCartItems);
  };

  return (
    <View style={styles.container}>
      {cartItems.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <Button title="-" onPress={() => decreaseQuantity(item)} />
            <Text style={styles.quantity}>{item.quantity}</Text>
            <Button title="+" onPress={() => increaseQuantity(item)} />
          </View>
          <View style={styles.removeButton}>
            <Button title="Remove" onPress={() => removeItem(item)} />
          </View>
        </View>
      ))}
      <Button
        title="Add Item"
        onPress={() =>
          addItem({
            id: Math.random(),
            name: "Item 1",
            price: "$10",
            image: "https://www.bootdey.com/image/280x280/00FFFF/000000",
            quantity: 1,
          })
        }
      />
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

// import React from "react";
// import {
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import FeatherIcon from "react-native-vector-icons/Feather";
// import CheckoutItem from "../Components/CheckoutItem";
// import { COLORS, FONTS } from "../Components/constants/theme";
// import Header from "../layout/Header";
// import pic1 from "../assets/images/pic1.jpg";
// import pic2 from "../assets/images/pic2.jpg";
// import pic3 from "../assets/images/pic3.jpg";
// import { GlobalStyleSheet } from "../Components/constants/StyleSheet";
// import CustomButton from "../Components/CustomButton";
// import Divider from "../Components/Dividers/Divider";
// import { useTheme } from "@react-navigation/native";

// const CheckoutData = [
//   {
//     image: pic1,
//     title: "Peter England Causual",
//     type: "Printed Longline Pure Cotteon T-shirt",
//     quantity: 1,
//     price: "$158.2",
//     oldPrice: "$170",
//   },
//   {
//     image: pic2,
//     title: "Peter England Causual",
//     type: "Printed Longline Pure Cotteon T-shirt",
//     quantity: 1,
//     price: "$158.2",
//     oldPrice: "$170",
//   },
//   {
//     image: pic3,
//     title: "Peter England Causual",
//     type: "Printed Longline Pure Cotteon T-shirt",
//     quantity: 1,
//     price: "$158.2",
//     oldPrice: "$170",
//   },
// ];

// const Cart = ({ navigation }) => {
//   const { colors } = useTheme();

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: colors.card,
//       }}
//     >
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: colors.background,
//         }}
//       >
//         <Header
//           backAction={() => navigation.navigate("Home")}
//           title={"Cart"}
//           leftIcon={"back"}
//           rightIcon={"more"}
//         />

//         <View style={{ flex: 1 }}>
//           <ScrollView>
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 paddingHorizontal: 15,
//                 paddingTop: 12,
//               }}
//             >
//               <Image
//                 style={{
//                   height: 35,
//                   width: 35,
//                   borderRadius: 20,
//                   marginRight: 10,
//                 }}
//                 source={"https://console.cloudinary.com/console/c-3b589c02ae2ce1429f06fc22e1f111/media_library/search/asset/c4d45bcbefb8970d1d11cd5ab29df31f/manage/metadata?q=&context=manage"}
//               />
//               <Text
//                 style={{
//                   ...FONTS.fontSm,
//                   ...FONTS.fontTitle,
//                   color: colors.title,
//                   flex: 1,
//                 }}
//               >
//                 Deliver to Yatin
//               </Text>
//               <TouchableOpacity
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                 }}
//               >
//                 {/* <Text
//                   style={{
//                     ...FONTS.fontSm,
//                     ...FONTS.fontMedium,
//                     color: COLORS.primary,
//                   }}
//                 >
//                   Ram krishan, puram
//                 </Text>
//                 <FeatherIcon
//                   color={COLORS.primary}
//                   style={{ marginLeft: 2, top: 1 }}
//                   size={16}
//                   name="chevron-down"
//                 /> */}
//               </TouchableOpacity>
//             </View>
//             <View style={[GlobalStyleSheet.container, { paddingTop: 12 }]}>
//               {CheckoutData.map((data, index) => (
//                 <View
//                   key={index}
//                   style={{
//                     marginBottom: 8,
//                   }}
//                 >
//                   <CheckoutItem
//                     onPress={() => navigation.navigate("ProductDetail")}
//                     image={data.image}
//                     title={data.title}
//                     type={data.type}
//                     quantity={data.quantity}
//                     price={data.price}
//                     oldPrice={data.oldPrice}
//                   />
//                 </View>
//               ))}
//               <Text
//                 style={{
//                   ...FONTS.fontSm,
//                   ...FONTS.fontTitle,
//                   color: colors.text,
//                   marginBottom: 6,
//                 }}
//               >
//                 Have a coupon code ? enter here
//               </Text>

//               <View>
//                 <FeatherIcon
//                   style={{
//                     position: "absolute",
//                     zIndex: 1,
//                     left: 18,
//                     top: 16,
//                   }}
//                   size={18}
//                   color={COLORS.primary}
//                   name="scissors"
//                 />
//                 <TextInput
//                   style={{
//                     ...FONTS.font,
//                     ...FONTS.fontBold,
//                     color: colors.title,
//                     borderWidth: 1,
//                     height: 48,
//                     backgroundColor: colors.card,
//                     borderColor: colors.borderColor,
//                     paddingHorizontal: 18,
//                     paddingLeft: 50,
//                     borderStyle: "dashed",
//                   }}
//                   defaultValue="B2GET150"
//                 />
//                 <TouchableOpacity
//                   style={{
//                     position: "absolute",
//                     right: 0,
//                     padding: 13,
//                   }}
//                 >
//                   <FeatherIcon
//                     size={22}
//                     color={colors.title}
//                     name="chevron-right"
//                   />
//                 </TouchableOpacity>
//               </View>

//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   marginBottom: 8,
//                   marginTop: 12,
//                 }}
//               >
//                 <Text style={{ ...FONTS.font, color: colors.text }}>
//                   Price :{" "}
//                 </Text>
//                 <Text
//                   style={{
//                     ...FONTS.font,
//                     ...FONTS.fontTitle,
//                     color: colors.title,
//                   }}
//                 >
//                   $158.2
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   marginBottom: 8,
//                 }}
//               >
//                 <Text style={{ ...FONTS.font, color: colors.text }}>
//                   Tax :{" "}
//                 </Text>
//                 <Text
//                   style={{
//                     ...FONTS.font,
//                     ...FONTS.fontTitle,
//                     color: colors.title,
//                   }}
//                 >
//                   0.5%
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   marginBottom: 8,
//                 }}
//               >
//                 <Text style={{ ...FONTS.font, color: colors.text }}>
//                   Delivery Fee :
//                 </Text>
//                 <Text
//                   style={{
//                     ...FONTS.font,
//                     ...FONTS.fontTitle,
//                     color: colors.title,
//                   }}
//                 >
//                   0.5%
//                 </Text>
//               </View>
//               <Divider
//                 dashed
//                 color={colors.borderColor}
//                 style={{ marginBottom: 0, marginTop: 0 }}
//               />
//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   marginBottom: 10,
//                   marginTop: 5,
//                   alignItems: "center",
//                   paddingTop: 8,
//                 }}
//               >
//                 <Text style={{ ...FONTS.font, color: colors.text }}>
//                   Total :{" "}
//                 </Text>
//                 <Text style={{ ...FONTS.h4, color: COLORS.primary }}>
//                   $215.5
//                 </Text>
//               </View>
//             </View>
//           </ScrollView>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             paddingHorizontal: 15,
//             paddingVertical: 10,
//             backgroundColor: colors.card,
//             borderTopWidth: 1,
//             borderColor: colors.borderColor,
//           }}
//         >
//           <View style={{ flex: 1 }}>
//             <Text style={{ ...FONTS.h4, color: colors.title }}>$215.5</Text>
//             <TouchableOpacity>
//               <Text
//                 style={{
//                   ...FONTS.fontXs,
//                   color: COLORS.primary,
//                   ...FONTS.fontTitle,
//                 }}
//               >
//                 View price details
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <View style={{ flex: 1 }}>
//             <CustomButton
//               btnSm
//               color={COLORS.secondary}
//               onPress={() => navigation.navigate("AddDeliveryAddress")}
//               title="Checkout"
//             />
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Cart;


