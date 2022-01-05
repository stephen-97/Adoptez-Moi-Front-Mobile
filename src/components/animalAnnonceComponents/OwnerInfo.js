import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Linking,
  Image,
  TouchableOpacity,
} from "react-native";
import { SIZES, icons } from "../../constants";
import Line from "../utility/Line";

const OwnerInfo = (props) => {
  const handleCall = async () => {
    const supported = await Linking.canOpenURL(
      `tel:${props.data.phone_number}`
    );
    if (supported) {
      await Linking.openURL(`tel:${props.data.phone_number}`);
    } else {
      alert(`Don't know how to open this URL:`);
    }
  };

  const handleSendMail = async () => {
    Linking.OpenURL(`${props.data._user.email}`);
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.valuesView}>
        <View style={styles.valueContainer}>
          <Text style={styles.title}>Pseudo</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.valueResponse}>{props.data._user.username}</Text>
        </View>
      </View>

      <Line color="rgba(0,0,0,0.1)" />

      <View style={styles.valuesView}>
        <View style={styles.valueContainer}>
          <Text style={styles.title}>Mail</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.valueResponseEmail}>{props.data._user.email}</Text>
        </View>
      </View>

      <Line color="rgba(0,0,0,0.1)" />

      <View style={styles.valuesView}>
        <View style={styles.valueContainer}>
          <Text style={styles.title}>Téléphone</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.valueResponse}>
            {props.data.phone_number !== ""
              ? props.data.phone_number
              : "(Non renségnié)"}
          </Text>
        </View>
      </View>

      <Line color="rgba(0,0,0,0.1)" />

      <TouchableOpacity
        style={styles.buttonEmail}
        onPress={() => handleSendMail()}
      >
        <Image style={styles.image} source={icons.email} />
      </TouchableOpacity>

      {props.data.phone_number !== "" ? (
        <TouchableOpacity
          style={styles.buttonPhone}
          onPress={() => handleCall()}
        >
          <Image style={styles.image} source={icons.phone} />
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  valuesView: {
    flexDirection: "row",
    height: 70,
    justifyContent: "center",
  },
  valueContainer: {
    justifyContent: "center",
    alignSelf: "center",
    width: 100,
    flex: 1,
  },
  valueResponse: {
    color: "rgb(85,85,85)",
    textAlign: "center",
    overflow: "hidden",
    alignSelf: "center",
    fontSize: SIZES.h4,
  },
  valueResponseEmail: {
    color: "rgb(85,85,85)",
    textAlign: "left",
    overflow: "hidden",
    alignSelf: "center",
    fontSize: SIZES.h4,
    width: 300,
  },
  title: {
    textAlign: "left",
    padding: SIZES.padding2,
    overflow: "hidden",
    width: 150,
    marginLeft: 30,
    alignSelf: "center",
    fontSize: SIZES.h4,
    color: "rgb(85,85,85)",
  },
  buttonView: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  buttonPhone: {
    position: "absolute",
    top: 350,
    right: 40,
  },
  buttonEmail: {
    position: "absolute",
    top: 350,
    left: 40,
  },
  image: {
    height: 80,
    width: 80,
  },
});

export default OwnerInfo;
