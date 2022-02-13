import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SERVER from "../../../config";
import { COLORS, SIZES } from "../../constants";
import Line from "../utility/Line";
import SliderBlockContent from "./SliderBlockContent";
import FirsSliderBlockContent from "./FirsSliderBlockContent";

const { width, height } = Dimensions.get("window");

const HomePageView = (props) => {
  const dataAnimalGroup = ["chien", "chat", "volatile", "reptile", "autre"];
  const dataColor = ["#9193d4", "#dbb69d", "#77cdca", "#77d199", "#e7ab61"];
  const dataColor2 = ["#b2b4e7", "#e6c1a8", "#a0e0de", "#98e0b3", "#e8d4bb"];
  const scrollX = new Animated.Value(0);
  const position = Animated.divide(scrollX, width);
  const [data, setDataResponse] = useState([]);
  const [speciesData, setSpeciesData] = useState({
    chien: 0,
    chat: 0,
    volatile: 0,
    reptile: 0,
    autres: 0,
  });

  const getSpeciesData = () => {
    fetch(`http://${SERVER.NAME}/statistics/species/count`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((jsonData) => {
        setSpeciesData(jsonData);
      });
  };

  const sendData = () => {
    const formData = new FormData();
    formData.append("numberOfAnimal", 5);
    fetch(`http://${SERVER.NAME}/wanted/sliderHomePage/`, {
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
    getSpeciesData();
  }, [isVisible]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.miniContainer}>
        <Text style={[styles.titreCarrousel]}>Animaux </Text>
        <FlatList
          data={dataAnimalGroup}
          keyExtractor={(item, index) => "key" + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View>
                <FirsSliderBlockContent
                  index={index}
                  navigation={props.navigation}
                  picture={`icons.animalType${index + 1}`}
                  count={speciesData[item]}
                  color={dataColor[index]}
                  color2={dataColor2[index]}
                  species={dataAnimalGroup[index]}
                />
                <Text style={styles.animalGroupTitle}>{item}</Text>
              </View>
            );
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
        />
      </View>
      <View style={styles.miniContainer}>
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
              <Animated.View
                key={key}
                style={[styles.itemsLogo, { opacity }]}
              />
            );
          })}
        </View>
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
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
  };
};

export default connect(mapStateToProps)(HomePageView);

const styles = StyleSheet.create({
  miniContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  titreCarrousel: {
    fontSize: SIZES.h2,
    paddingVertical: 10,
    width: "100%",
    marginLeft: 30,
    fontWeight: "bold",
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
  animalGroupTitle: {
    left: 20,
    color: COLORS.darkgray,
    fontWeight: "bold",
    fontSize: 15,
  }
});
