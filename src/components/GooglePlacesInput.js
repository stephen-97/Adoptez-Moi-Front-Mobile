import React from "react";
import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import PropTypes from "prop-types";
// import RNLocation from "react-native-location";
import { COLORS, GOOGLE_API_KEY } from "../constants";

// navigator.geolocation = require("react-native-location");

// RNLocation.configure({
//   distanceFilter: 5.0,
// });

// RNLocation.requestPermission({
//   ios: "whenInUse",
//   android: {
//     detail: "coarse",
//   },
// }).then((granted) => {
//   if (granted) {
//     this.locationSubscription = RNLocation.subscribeToLocationUpdates(
//       (locations) => {
//         console.log(locations);
//       }
//     );
//   }
// });

const GooglePlacesInput = ({ inputStyle, notifyChange }) => {
  return (
    <View keyboardShouldPersistTaps="handled">
      <GooglePlacesAutocomplete
        placeholder="Adresse"
        currentLocation
        enablePoweredByContainer={false}
        minLength={2}
        returnKeyType="search"
        // renderHeaderComponent={() => {}}
        fetchDetails
        onFail={(error) => console.log("error", error)}
        keyboardShouldPersistTaps="handled"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          notifyChange(details.geometry.location);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "fr",
          components: "country:fr",
        }}
        debounce={200}
        styles={{
          textInput: {
            ...inputStyle,
          },
          predefinedPlacesDescription: {
            color: COLORS.secondary,
          },
        }}
        textInputProps={{ placeholderTextColor: COLORS.black }}
      />
    </View>
  );
};

GooglePlacesInput.propTypes = {
  notifyChange: PropTypes.func.isRequired,
};

export default GooglePlacesInput;
