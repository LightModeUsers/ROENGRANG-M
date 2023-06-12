// import React, { useState } from "react";
// import { SearchBar } from "@rneui/themed";
// import { View, Text, StyleSheet } from "react-native";

// const SwitchComponent = () => {
//   const [search, setSearch] = useState("");

//   const updateSearch = (search) => {
//     setSearch(search);
//   };
//   const [value, setValue] = React.useState("");
//   return (
//     <View style={styles.view}>
//       <SearchBar
//         platform="android"
//         containerStyle={{ backgroundColor: "#f7a25c" }}
//         inputContainerStyle={{ backgroundColor: "#f7a25c" }}
//         inputStyle={{ color: "white" }}
//         leftIconContainerStyle={{ backgroundColor: "#f7a25c" }}
//         rightIconContainerStyle={{ backgroundColor: "#f7a25c" }}
//         loadingProps={{ color: "#f7a25c" }}
//         onChangeText={(newVal) => setValue(newVal)}
//         onClearText={() => console.log(onClearText())}
//         placeholder="Type query here..."
//         placeholderTextColor="#fff"
//         cancelButtonTitle="Cancel"
//         cancelButtonProps={{}}
//         // onCancel={() => console.log(onCancel())}
//         value={value}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   view: {
//     margin: 10,
//     width: 400,
//   },
// });

// export default SwitchComponent;

import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../Components/constants/theme";
import FeatherIcon from "react-native-vector-icons/Feather";

const SearchBar = (props) => {
  return (
    <>
      <View
        style={{
          position: "relative",
        }}
      >
        <TextInput
          style={{
            fontSize: 18,
            width: 270,
            borderWidth: 1,
            borderColor: COLORS.borderColor,
            borderRadius: SIZES.radius,
            paddingHorizontal: 18,
            paddingVertical: 10,
            color: COLORS.title,
          }}
          placeholder="Search here.."
          placeholderTextColor={COLORS.text}
        />
        <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 0,
            top: -2,
          }}
        >
          <FeatherIcon name="search" color={COLORS.secondary} size={26} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SearchBar;
