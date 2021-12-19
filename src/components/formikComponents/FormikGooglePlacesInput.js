import React from "react";
import { Text, View } from "react-native";
import GooglePlacesInput from "../GooglePlacesInput";

const FormikGooglePlacesInput = (props) => {
  const {
    field: { name },
    form: { errors, touched, setFieldValue },
    style,
  } = props;

  const hasError = errors[name] && touched[name];
  return (
    <View>
      <GooglePlacesInput
        notifyChange={(loc) =>
          setFieldValue(name, {
            latitude: loc.lat,
            longitude: loc.lng,
          })
        }
        inputStyle={style}
      />
      {hasError && <Text style={{ color: "red" }}>{errors[name]}</Text>}
    </View>
  );
};

export default FormikGooglePlacesInput;
