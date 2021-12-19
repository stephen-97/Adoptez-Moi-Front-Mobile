import React from "react";
import { Text, TextInput } from "react-native";

const FormikTextInput = (props) => {
  const {
    placeholder,
    style,
    multiline,
    placeholderTextColor,
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
  } = props;

  const hasError = errors[name] && touched[name];
  return (
    <>
      <TextInput
        placeholder={placeholder}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        style={style}
        multiline={multiline}
        placeholderTextColor={placeholderTextColor}
      />
      {hasError && <Text style={{ color: "red" }}>{errors[name]}</Text>}
    </>
  );
};

export default FormikTextInput;
