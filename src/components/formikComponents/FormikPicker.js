import React from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const FormikPicker = (props) => {
  const {
    field: { name, value },
    form: { errors, touched, setFieldValue },
    selectOptions,
    style,
  } = props;

  const hasError = errors[name] && touched[name];
  return (
    <View>
      <View style={style}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => setFieldValue(name, itemValue)}
        >
          {selectOptions.map((item) => {
            return (
              <Picker.Item
                label={item.label}
                value={item.value}
                key={item.value}
              />
            );
          })}
        </Picker>
      </View>
      {hasError && <Text style={{ color: "red" }}>{errors[name]}</Text>}
    </View>
  );
};

export default FormikPicker;
