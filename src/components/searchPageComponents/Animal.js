import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { images, COLORS } from "../../constants";
import SERVER from "../../../config";

const Animal = (props) => {
  return (
    <React.Fragment key="animal">
      <TouchableOpacity
        style={style.container}
        onPress={() =>
          props.navigation.push("AnimalBigScreen", {
            data: props.data,
            navigation: props.navigation,
          })
        }
      >
        <View style={style.image_container}>
          <Image
            style={style.image}
            source={{
              uri: `http://${SERVER.NAME}/upload/${props.data.images[0].name}`
            }}
          />
          <Text style={[style.info, { color: "black" }]}>
            {props.data.animal_species}
          </Text>
        </View>
        <View style={style.other_info_container}>
          <View>
            <Text style={style.info}>{props.data.name}</Text>
            <Text style={style.info}>{props.data.age} ans</Text>
            <Text style={style.info}>{props.data.price} €</Text>
            <Text style={style.info}>{props.data.sex}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </React.Fragment>
  );
};

const style = StyleSheet.create({
  container: {
    marginVertical: 15,
    height: 180,
    backgroundColor: COLORS.lightGray3,
    width: "92.5%",
    borderRadius: 20,
    justifyContent: "center",
    overflow: "hidden",
  },

  info: {
    color: "black",
    fontSize: 20,
    fontWeight: "500",
    marginVertical: 3,
  },
  age: {
    color: "black",
    fontSize: 20,
    fontWeight: "500",
    marginVertical: 3,
  },
  image: {
    marginTop: 20,
    width: 120,
    height: 120,
    borderRadius: 500,
  },
  race: {
    color: "white",
    position: "absolute",
    bottom: 10,
    marginLeft: 55,
  },
  name: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    marginVertical: 3,
  },
  image_container: {
    width: 120,
    flex: 1,
    left: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  other_info_container: {
    position: "absolute",
    backgroundColor: "#cfcfcf",
    alignItems: "center",
    justifyContent: "center",
    right: 0,
    height: 250,
    width: 155,
    borderTopLeftRadius: 400,
    borderBottomLeftRadius: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: -0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20.0,
    elevation: 0,
  },
});

export default Animal;
