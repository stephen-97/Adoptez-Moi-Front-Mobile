import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, SIZES, icons } from "../../constants";
import SERVER from "../../../config";

const AlerteInfo = (props) => {
  const [data, setData] = useState([]);

  const sendData = () => {
    const formData = new FormData();
    formData.append("userId", props.data._user.id);
    return fetch(`http://${SERVER.NAME}/wanted/animalsListForAnUser/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      });
  };

  const checkAnimal = (elem) => {
    props.navigation.push("AnimalBigScreen", {
      data: elem,
      navigation: props.navigation,
    });
  };

  useEffect(() => {
    sendData();
  }, []);

  const renderOthersAnimalFromUser = (elem, i) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.block}
        onPress={() => checkAnimal(elem)}
        key={i}
      >
        <View>
          <Image
            style={styles.image}
            source={{
              uri: `http://${SERVER.NAME}/upload/${data[i].images[0].name}`,
            }}
          />
          <Text style={styles.name}>{data[i].name}</Text>
          <Text style={styles.specie}>{data[i].species}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>
        {` Autres annonces de ${props.data._user.username}    `}
        <Image
          style={styles.imageAvatar}
          source={
            props.data._user.avatar
              ? {
                  uri: `http://${SERVER.NAME}/avatar/${props.data._user.avatar}`,
                }
              : icons.accountLogo
          }
        />
      </Text>
      <View style={{marginTop: 50}}>
        {data.map((elem, i) => (
          <>
            {props.data.id !== data[i].id
              ? renderOthersAnimalFromUser(elem, i)
              : null}
          </>
        ))}
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "100%",
  },
  title: {
    textAlign: "center",
    height: 50,
    fontSize: SIZES.h3,
    color: "rgb(85,85,85)",
  },
  block: {
    height: 100,
    marginBottom: 15,
    borderRadius: SIZES.borderRadius2,
    backgroundColor: "#cfcfcf",
    borderColor: "white",
    borderWidth: 1,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 50,
    left: 30,
    paddingLeft: 20,
    position: "absolute",
    top: 50,
    transform: [{translateY: -40}]
  },
  imageAvatar: {
    height: 80,
    width: 80,
    borderRadius: 50,
    left: 50,
    paddingLeft: 20,
  },
  name: {
    position: "absolute",
    height: 30,
    top: 50,
    transform: [{ translateY: -15 }],
    alignItems: "center",
    left: 150,
    fontSize: SIZES.h2,
    color: "rgb(85,85,85)",
  },
  specie: {
    position: "absolute",
    height: 30,
    top: 50,
    transform: [{ translateY: -15 }],
    alignItems: "center",
    right: 50,
    fontSize: SIZES.h2,
    color: "rgb(85,85,85)",
  },
});

export default AlerteInfo;
