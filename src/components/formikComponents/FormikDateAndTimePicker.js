import React from "react";
import { Text, View } from "react-native";
import DateAndTimePicker from "../DateAndTimePicker";

const FormikDateAndTimePicker = (props) => {
  const {
    field: { name },
    form: { errors, touched, setFieldValue, setFieldTouched, onBlur },
    defaultDate,
    style,
    defaultMinDate,
    defaultMaxDate,
    mode,
    onSetField,
  } = props;

  const hasError = errors[name] && touched[name];

  const setField = (val) => {
    const fieldValue = onSetField(val);
    setFieldValue(name, fieldValue);
  };

  return (
    <View>
      <DateAndTimePicker
        onDateChange={(val) => setField(val)}
        mode={mode}
        defaultDate={defaultDate}
        textStyle={style}
        defaultMinDate={defaultMinDate}
        defaultMaxDate={defaultMaxDate}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
      />
      {hasError && <Text style={{ color: "red" }}>{errors[name]}</Text>}
    </View>
  );
};

export default FormikDateAndTimePicker;
