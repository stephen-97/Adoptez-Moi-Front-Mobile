import React, { useMemo, useRef, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  Dimensions,
  Animated,
  Button
} from "react-native";
import BottomSheet from 'reanimated-bottom-sheet';

const InputRange = (props) => {

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
      }}
    >
      <Text>Swipe down to close</Text>
    </View>
  );

  const sheetRef = React.useRef(null);

  return (
    <>
    <View
      style={{
        flex: 1,
        backgroundColor: 'papayawhip',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "red",
      }}
    >
      <Button
        title="Open Bottom Sheet"
        onPress={() => sheetRef.current.snapTo(0)}
      />
    </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
    </>
  );
};

export default InputRange;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    justifyContent: "center",
  },
  trilho: {
    backgroundColor: "#B9BED1",
    position: "absolute",
    height: 6,
    borderRadius: 6,
  },
  knob: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    position: "absolute",
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.3,
  },
});


/**
 * 
 * 
 * import React, { useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  Dimensions,
  Animated,
} from "react-native";
import event from "event-module";
import Svg, { Line } from "react-native-svg";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { COLORS, SIZES, icons } from "../../constants";
const { width } = Dimensions.get("window");

const { animView: TheAnimView, Value, Event, set, block, cond, lessThan, greaterThan, add} = Animated;

const WIDTH = width - 80;
const MAX_WIDTH = WIDTH - 80;

const usePanGesture = () => {
  const transX = useRef(new Value(0)).current;
  const offsetX = useRef(new Value(0)).current;

  const onGestureHandle = useMemo(() => {
    return event([
      {
        nativeEvent:({translationX:x, state}) =>
        block(
          [
            cond(lessThan(add(offsetX+x), 0), set(transX,0), [
              cond(
                greaterThan(add(offsetX, x), MAX_WIDTH),
                set(transX, MAX_WIDTH),
                set(transX, add(offsetX, x))
              ),
            ]),
            cond(eq(state, State.END), set(offsetX, add(offsetX, x))),
          ]),
      },
    ]);
  }, [transX, offsetX]);

  return { transX, onGestureHandle };
};

const PanComponente = () => {
  const { transX, onGestureHandle} = usePanGesture();
  return (
    <PanGestureHandler
      onGestureEvent={onGestureHandle}
      onHandlerStateChange={onGestureHandle}
    >
      <TheAnimView style={[styles.knob, { transform: [{ translateX: 0 }] }]} />
    </PanGestureHandler>
  );
};

const InputRange = ({minValue, maxvalue, onChangeMin, onChangeMax}) => {

  return (
    <View style={styles.container}>
      <View style={styles.trilho}>
        <View style={{ position: "absolute" }}>
          <Svg height="6" width={WIDTH}>
            <Line
              stroke="red"
              strokeWidth="12"
              x1={100}
              y1={0}
              x2={WIDTH}
              y2={0}
            />
          </Svg>
        </View>
      </View>
      <PanComponente />
    </View>
  );
};
 */