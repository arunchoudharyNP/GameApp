import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import Svg, { Line } from "react-native-svg";

const Screen = (props) => {
  const [touchCords, settouchCords] = useState([]);
  const [line, pushLine] = useState([]);
  const [size, setsize] = useState(0);
  const [stopTouch, setstopTouch] = useState(false);

  const change = useRef(touchCords.length);

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
    console.log(touchCords);
  }, [touchCords]);

  //.........Undo View
  const undoElement = () => {
    return (
      <TouchableOpacity
        style={styles.undo}
        onPress={() => {
          removeLast();
        }}
      >
        <Text style={styles.text}>Undo</Text>
      </TouchableOpacity>
    );
  };

  //..............Remove Last
  const removeLast = () => {
    setstopTouch(false);
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

  //.........RandomColor
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  //...........Render Line
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

  // .............OnTouchEvent
  const onTouchPress = (event) => {
    let ignore = false;
    change.current = touchCords.length;
    const touch = {
      x: Math.ceil(event.nativeEvent.locationX),
      y: Math.ceil(event.nativeEvent.locationY),
    };

    console.log(".......");
    console.log(Math.ceil(touch.x));
    console.log(Math.ceil(touch.y));
    console.log(".......");

    touchCords.forEach((data) => {
      if (
        Math.ceil(event.nativeEvent.locationX) < 15 &&
        Math.ceil(event.nativeEvent.locationY) < 15
      ) {
        ignore = true;
        console.log("same");
        return;
      }
    });

    if (ignore) {
    } else {
      settouchCords((prev) => [...prev, touch]);
    }
  };

  const mainScreen = () => {
    return (
      <TouchableOpacity
        style={{ flex: 9 }}
        onPress={(event) => {
          !stopTouch && onTouchPress(event);
        }}
      >
        {line.length > 0 &&
          line.map((data) => {
            return data;
          })}

        {touchCords.length > 0 &&
          touchCords.map((data, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  console.log(index);
                  if (index == 0) {
                    console.log("Clicked on 1st");
                    setstopTouch(true);
                    settouchCords((prev) => [...prev, touchCords[0]]);
                    change.current = touchCords.length;
                  }
                }}
              >
                {
                  <View
                    style={{
                      position: "absolute",
                      left: touchCords[index].x,
                      top: touchCords[index].y,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "black",
                        height: 14,
                        width: 14,
                        borderRadius: 10,
                        transform: [{ translateX: -7.5 }],
                      }}
                    ></View>
                  </View>
                }
              </TouchableWithoutFeedback>
            );
          })}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {undoElement()}
      {mainScreen()}
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
