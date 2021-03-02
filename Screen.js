import React, { useState, useEffect, useRef } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

import Svg, { Line } from "react-native-svg";

const Screen = (props) => {
  const [touchCords, settouchCords] = useState([]);
  const [line, pushLine] = useState([]);
  const [size, setsize] = useState(0);
  const [stopTouch, setstopTouch] = useState(false);

  let match;

  const change = useRef(touchCords.length);
  const removeLast = () => {
    change.current = touchCords.length;
    pushLine((prev) =>
      prev
        .reverse()
        .slice(0, prev.length - 1)
        .reverse()
    );
    settouchCords((prev) => prev.reverse().slice(1).reverse());
    setsize((prev) => prev - 1);
  };

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    if (touchCords.length > 1 && touchCords.length > change.current) {
      pushLine((prev) => [
        renderLine(
          touchCords[touchCords.length - 2],
          touchCords[touchCords.length - 1]
        ),
        ...prev,
      ]);
      change.current = touchCords.length;
    }
  }, [touchCords]);

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

  const onTouchPress = (event) => {
    change.current = touchCords.length;
    const touch = {
      x: event.nativeEvent.locationX,
      y: event.nativeEvent.locationY,
    };

    settouchCords((prev) => [...prev, touch]);
    setsize((prev) => prev + 1);
    console.log(size);
    console.log(touchCords);
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.undo}
        onPress={() => {
          removeLast();
        }}
      >
        <Text style={styles.text}>Undo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 9 }}
        onPress={(event) => {
          match = touchCords.find(
            ({ x, y }) =>
              x === event.nativeEvent.locationX &&
              y === event.nativeEvent.locationY
          );
          setstopTouch(match);
          console.log(match);
          if (!match) {
            onTouchPress(event);
          }
        }}
      >
        {line.length > 0 &&
          line.map((data) => {
            return data;
          })}

        {touchCords.length > 0 &&
          touchCords.map((data) => {
            return (
              <View key={data.x * Math.random()}>
                <View
                  style={{
                    position: "absolute",
                    left: data.x,
                    top: data.y,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "black",
                      height: 15,
                      width: 15,
                      borderRadius: 10,
                      transform: [{ translateX: -7.5 }],
                    }}
                  ></View>
                </View>
              </View>
            );
          })}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  undo: {
    flex: 1,
    height: 50,
    width: "100%",
    padding: 20,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  text: {
    color: "blue",
    fontSize: 35,
    alignSelf: "center",
    marginTop: 30,
  },
});

export default Screen;
