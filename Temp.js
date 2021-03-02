import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function App() {
  const [touchCords, settouchCords] = useState([]);
  const undoFunction = () => {};

  const renderPoint = ({ item }) => {
    return (
      <View
        style={{
          position: "absolute",
          left: item.x,
          top: item.y,
          backgroundColor: "black",
          height: 10,
          width: 10,
          borderRadius: 5,
        }}
      >
        <Text>H</Text>
      </View>
    );
  };

  const createPoint = (e) => {
    console.log("cords" + e);
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <TouchableOpacity style={styles.undo} onPress={() => {}}>
          <Text style={styles.text}> Undo</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableWithoutFeedback
          onPress={(e) => {
            settouchCords((prev) => {
              [...prev, { x: e.locationX, y: e.locationY }];
            });
            console.log("touchMove", e);
          }}
        ></TouchableWithoutFeedback>
      </View>

      {/* {touchCords.length > 0 &&
        touchCords.forEach((data) => {
          return (
            <View
              style={{
                position: "absolute",
                left: item.x,
                top: item.y,
                backgroundColor: "black",
                height: 10,
                width: 10,
                borderRadius: 5,
              }}
            >
              <Text>H</Text>
            </View>
          );
        })} */}
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
  },
});

const renderLine = (prevTouch, CurrentTouch) => {
  return (
    <Svg
      position="absolute"
      key={Math.random() * (prevTouch.x - CurrentTouch.y)}
    >
      <Line
        x1={prevTouch.x}
        y1={prevTouch.y}
        x2={CurrentTouch.x}
        y2={CurrentTouch.y}
        stroke={getRandomColor()}
        strokeWidth="2"
      />
    </Svg>
  );
};

{
  /* {touchCords.length > 1 &&
          touchCords.map((data, index) => {
            return (
              <Svg position="absolute" key={data.x}>
                <Line
                  x1={touchCords[size - 1].x}
                  y1={touchCords[size - 1].y}
                  x2={data.x}
                  y2={data.y}
                  stroke="red"
                  strokeWidth="2"
                />
              </Svg>
            );
          })} */
}
