import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  
  StyleSheet,
  
  View,
  
} from "react-native";
import Screen from "./Screen";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
     <Screen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  undo: {
    position: "absolute",
    top: 70,
    right: 30,
  },
  text: {
    color: "blue",
    fontSize: 35,
    alignSelf: "flex-end",
  },
});
