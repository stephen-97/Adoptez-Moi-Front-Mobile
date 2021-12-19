import React, { useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Platform,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { COLORS } from "../constants";

const DateAndTimePicker = (props) => {
  // console.log("props", props);
  const { defaultDate } = props;
  const [date, setDate] = useState(moment(defaultDate));
  const [show, setShow] = useState(false);

  const onAndroidChange = (e, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(moment(selectedDate));
      props.onDateChange(selectedDate);
    }
  };

  const onIosChange = (e, selectedDate) => {
    setDate(moment(selectedDate));
  };

  const onPressCancel = () => {
    setDate(moment(defaultDate));
    setShow(false);
  };

  const onPressDone = () => {
    props.onDateChange(date);
    setShow(false);
  };

  const renderDateTimePicker = () => {
    return (
      <DateTimePicker
        value={new Date(date)}
        mode={props.mode}
        minimumDate={props.defaultMinDate}
        maximumDate={props.defaultMaxDate}
        onChange={Platform.OS === "ios" ? onIosChange : onAndroidChange}
      />
    );
  };

  const renderInputDateTime = () => {
    let inputDateTime;
    if (props.mode === "date") {
      inputDateTime = (
        <Text style={props.textStyle}>{date.format("DD/MM/YYYY")}</Text>
      );
    } else {
      inputDateTime = (
        <Text style={props.textStyle}>{date.format("HH:mm")}</Text>
      );
    }
    return inputDateTime;
  };

  return (
    <TouchableHighlight activeOpacity={0} onPress={() => setShow(true)}>
      <View>
        {renderInputDateTime()}

        {Platform.OS !== "ios" && show && <View>{renderDateTimePicker()}</View>}

        {Platform.OS === "ios" && (
          <Modal
            transparent
            animationType="slide"
            visible={show}
            supportedOrientations={["portrait"]}
            onRequestClose={() => setShow(false)}
          >
            <View style={{ flex: 1 }}>
              <TouchableHighlight
                style={styles.iosDatePickerMask}
                activeOpacity={1}
                visible={show}
                onPress={() => setShow(false)}
              >
                <TouchableHighlight
                  underlayColor={COLORS.white}
                  style={{
                    flex: 1,
                    borderTopColor: COLORS.lightGray2,
                    borderTopWidth: 1,
                  }}
                >
                  <View style={styles.iosDatePicker}>
                    <View style={{ marginTop: 40 }}>
                      {renderDateTimePicker()}
                    </View>

                    <TouchableHighlight
                      underlayColor={COLORS.transparent}
                      onPress={onPressCancel}
                      style={[styles.btnText, styles.btnCancel]}
                    >
                      <Text style={styles.btnTextText}>Annuler</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      underlayColor={COLORS.transparent}
                      onPress={onPressDone}
                      style={[styles.btnText, styles.btnDone]}
                    >
                      <Text style={styles.btnTextText}>Valider</Text>
                    </TouchableHighlight>
                  </View>
                </TouchableHighlight>
              </TouchableHighlight>
            </View>
          </Modal>
        )}
      </View>
    </TouchableHighlight>
  );
};

DateAndTimePicker.defaultProps = {
  mode: "",
  defaultDate: moment(),
  defaultMinDate: moment(),
  defaultMaxDate: moment(),
  textStyle: {},
  onDateChange: () => {},
};

const styles = StyleSheet.create({
  iosDatePickerMask: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
  },
  iosDatePicker: {
    backgroundColor: COLORS.white,
    height: 260,
    overflow: "hidden",
  },
  btnText: {
    position: "absolute",
    top: 0,
    height: 42,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnTextText: {
    fontSize: 16,
    color: COLORS.primary,
  },
  btnCancel: {
    left: 0,
  },
  btnDone: {
    right: 0,
  },
});

export default DateAndTimePicker;
