import React, { useEffect, useState} from "react";
import * as SecureStore from "expo-secure-store";
import { connect } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
  Dimensions,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import SERVER from "../../../config";
import { COLORS, SIZES, images } from "../../constants";
import Line from "../utility/Line";
import SliderBlockContent from "./SliderBlockContent";

const { width, height } = Dimensions.get("window");

const HomePageView = (props) => {
  const scrollX = new Animated.Value(0);
  const position = Animated.divide(scrollX, width);
  const [data, setDataResponse] = useState([]);

  async function save(key, value) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.log(error);
    }
  }
  function getValueFor(key) {
    const result = SecureStore.getItemAsync(key);
    if (result) {
      console.log("🔐 Here's your value 🔐 \n" + Object.values(result));
    } else {
      console.log('No values stored under that key.');
    }
  }

  const sendData = () => {
    const formData = new FormData();
    formData.append("numberOfAnimal", 5);
    return fetch(`http://${SERVER.NAME}/wanted/sliderHomePage/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((jsonData) => {
        if (jsonData.code === false) {
          setDataResponse([]);
        } else {
          setDataResponse(jsonData);
        }
      });
  };

  const isVisible = useIsFocused();
  useEffect(() => {
    sendData();
  }, [isVisible]);

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <Text style={styles.titreCarrousel}>Pas encore d'annonces disponibles </Text>
      ) : (
      <Text style={styles.titreCarrousel}>Dernières annonces </Text>
      )}
      <FlatList
        ref={(ref) => (flatListRef = ref)}
        data={data}
        keyExtractor={(item, index) => "key" + index}
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <>
              <SliderBlockContent
                navigation={props.navigation}
                data={item}
                picture={{
                  uri: `http://${SERVER.NAME}/upload/${item.images[0].name}`
                }}
                nom={item.name}
                espece={item.species}
                department={item.department}
              />
            </>
          );
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
      />
      <View style={styles.logoView}>
        {data.map((_, key) => {
          const opacity = position.interpolate({
            inputRange: [key - 1, key, key + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          return (
            <Animated.View key={key} style={[styles.itemsLogo, { opacity }]} />
          );
        })}
      </View>
      <Line color={COLORS.lightGray} />
      {props.AuthProps.token ? (
        <TouchableOpacity onPress={() => null} style={styles.buttonConnexion}>
          <Text style={styles.textButton}>Déposer un avis</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => null} style={styles.buttonConnexion}>
          <Text style={styles.textButton}>Connexion</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
  };
};

export default connect(mapStateToProps)(HomePageView);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  titreCarrousel: {
    fontSize: SIZES.h2,
    paddingVertical: 10,
  },
  logoView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  itemsLogo: {
    height: 10,
    width: 10,
    backgroundColor: "#595959",
    margin: 8,
    borderRadius: 5,
  },
  textContainer: {
    justifyContent: "center",
    flex: 1,
  },
  buttonConnexion: {
    marginVertical: 20,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: SIZES.padding2,
    backgroundColor: COLORS.tertiary,
    borderRadius: 5,
  },
  textButton: {
    fontSize: SIZES.h2,
    color: "white",
  },
});
