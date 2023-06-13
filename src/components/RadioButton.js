import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "../constants";

const RadioButton = ({ onPress, selected, children }) => {
  return (
    <View style={styles.radioButtonContainer}>
      <TouchableOpacity onPress={onPress} style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonIcon} /> : null}
      </TouchableOpacity>
      <TouchableOpacity>
        <Text onPress={onPress} style={styles.radioButtonText}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

RadioButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: COLORS.secondary,
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default RadioButton;
