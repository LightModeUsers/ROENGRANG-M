import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/Feather';

const BottomNavigator = () => {
  return (
    <View style={Styles.bottomBar}>
      <TouchableOpacity>
        <AntDesign name="home" size={32} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="shopping-bag" size={32} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="shoppingcart" size={32} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="hearto" size={32} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="user" size={32} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 60,
    backgroundColor: "#f7a25c",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    position: "absolute",
    bottom: 0,
  },
});

export default BottomNavigator;
