import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import BottomNavigator from "../Components/BottomNavigator";
import SearchBar from "../Components/SearchBar";
import { AntDesign } from "@expo/vector-icons";
import Product from "../Components/ProductList";

const HomeScreen = () => {
  return (
    <View style={Styles.container}>
      <View style={Styles.headerBar}>
        {/* SearchBar */}
        <SearchBar />

        <TouchableOpacity>
          <AntDesign name="bars" size={32} color="#000" />
        </TouchableOpacity>
      </View>

      {/* เนื้อหาหลัก */}
      <Product />

      {/* BottomBar */}
      <BottomNavigator />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    backgroundColor: "#f7a25c",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 20,
  },
});

export default HomeScreen;
