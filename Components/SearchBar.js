import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";

const SwitchComponent = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };
  const [value, setValue] = React.useState("");
  return (
    <View style={styles.view}>
      <SearchBar
        platform="android"
        containerStyle={{ backgroundColor: "#f7a25c" }}
        inputContainerStyle={{ backgroundColor: "#f7a25c" }}
        inputStyle={{ color: "white" }}
        leftIconContainerStyle={{ backgroundColor: "#f7a25c" }}
        rightIconContainerStyle={{ backgroundColor: "#f7a25c" }}
        loadingProps={{ color: "#f7a25c" }}
        onChangeText={(newVal) => setValue(newVal)}
        onClearText={() => console.log(onClearText())}
        placeholder="Type query here..."
        placeholderTextColor="#fff"
        cancelButtonTitle="Cancel"
        cancelButtonProps={{}}
        // onCancel={() => console.log(onCancel())}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
    width: 400,
  },
});

export default SwitchComponent;
