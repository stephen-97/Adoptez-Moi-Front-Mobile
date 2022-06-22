import React, { useEffect, useState } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { tokenDecode } from "../components/utility/functions";
import { COLORS, icons, SIZES } from "../constants";
import SERVER from "../../config";
import AnimalInfo from "../components/animalAnnonceComponents/AnimalInfo";
import CommentsInfo from "../components/animalAnnonceComponents/CommentInfo";
import OwnerInfo from "../components/animalAnnonceComponents/OwnerInfo";
import AlerteInfo from "../components/animalAnnonceComponents/AlerteInfo";
import CloseModal from "../components/utility/CloseModalButton";

const { width, height } = Dimensions.get("window");

const AnimalBigScreen = (props) => {
  const valueSlider = ["Animal", "Maître", "Autres", "Questions"];

  const data = [0, 1, 2, 3];
  const scrollX = new Animated.Value(0);
  const position = Animated.divide(scrollX, width);

  const [favoriteChecked, setFavoriteChecked] = useState(false);
  const [comments, setComments] = useState([]);

  const addOrRemoveFavorite = () => {
    const intermediate = favoriteChecked;
    setFavoriteChecked(!favoriteChecked);
    const formData = new FormData();
    return fetch(
      `http://${SERVER.NAME}/favorite/addOrRemove/${props.route.params.data.id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: props.AuthProps.token,
        },
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((jsonData) => {
        if (jsonData.status !== "200") setFavoriteChecked(intermediate);
      });
  };

  const checkIfThisAnimalIsOnFavorite = () => {
    if (props.route.params.data.favorite.length !== 0) {
      for (let i = 0; i < props.route.params.data.favorite.length; i = 1 + i) {
        if (
          props.route.params.data.favorite[i].username ===
          tokenDecode(props.AuthProps.token).user
        )
          setFavoriteChecked(true);
      }
    } else {
      setFavoriteChecked(false);
    }
  };

  useEffect(() => {
    if (props.AuthProps.token) checkIfThisAnimalIsOnFavorite();
  }, []);

  useEffect(() => {
    if (props.route.params.deletedFromAdmin) props.navigation.goBack();
  }, [props.route.params.deletedFromAdmin]);

  return (
    <View style={styles.container}>
      {props.AuthProps.token ? (
        <>
          <TouchableOpacity
            style={styles.favoriteIcon}
            onPress={() => addOrRemoveFavorite()}
          >
            <Image
              source={favoriteChecked ? icons.heartChecked : icons.heart}
              style={{ height: "100%", width: "100%" }}
            />
          </TouchableOpacity>
          {tokenDecode(props.AuthProps.token).role.includes("ROLE_ADMIN") ? (
            <TouchableOpacity
              style={styles.deleteAdmin}
              onPress={() =>
                props.navigation.push("AdminDeleteAnimal", {
                  data: props.route.params.data,
                })
              }
            >
              <Image
                source={icons.trash}
                style={{ height: "100%", width: "100%" }}
              />
            </TouchableOpacity>
          ) : null}
        </>
      ) : null}
      <CloseModal navigation={() => props.navigation.goBack(null)} />
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: `http://${SERVER.NAME}/upload/${props.route.params.data.images[0].name}`,
          }}
        />
      </View>
      <View style={styles.sliderValuesContainer}>
        {valueSlider.map((index, key) => {
          const borderBottomColor = position.interpolate({
            inputRange: [key - 1, key, key + 1],
            outputRange: ["rgba(85,85,85,0)", "#555555", "rgba(85,85,85,0)"],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={key}
              style={[styles.sliderValues, { borderBottomColor }]}
            >
              <Text style={styles.sliderValuesText}>{index}</Text>
            </Animated.View>
          );
        })}
      </View>
      <FlatList
        ref={(ref) => (flatListRef = ref)}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.flatListContainer} key={index}>
              {index === 0 ? (
                <AnimalInfo data={props.route.params.data} />
              ) : null}
              {index === 1 ? (
                <OwnerInfo data={props.route.params.data} />
              ) : null}
              {index === 2 ? (
                <AlerteInfo
                  comments={comments}
                  data={props.route.params.data}
                  navigation={props.route.params.navigation}
                />
              ) : null}
              {index === 3 ? (
                <CommentsInfo
                  data={props.route.params.data}
                  navigation={props.route.params.navigation}
                />
              ) : null}
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
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.secondaryLight,
    borderRadius: 50,
  },
  deleteAdmin: {
    position: "absolute",
    height: 40,
    width: 40,
    top: "6%",
    right: "8%",
    marginBottom: 10,
    zIndex: 2,
  },
  favoriteIcon: {
    position: "absolute",
    height: 40,
    width: 40,
    top: "30%",
    left: "8%",
    marginBottom: 10,
    zIndex: 2,
  },
  imageContainer: {
    height: 300,
    alignItems: "center",
  },
  image: {
    position: "absolute",
    alignSelf: "center",
    borderRadius: 500,
    bottom: 15,
    width: 200,
    height: 200,
  },
  sliderValuesContainer: {
    height: 60,
    flexDirection: "row",
  },
  sliderValues: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 3,
  },
  sliderValuesText: {
    color: "rgb(85,85,85)",
    fontSize: SIZES.h4,
  },
  flatListContainer: {
    width: width,
    backgroundColor: COLORS.secondary,
  },
  descriptionContainer: {
    height: 250,
    flexDirection: "column",
  },
  valuesView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
  },
  valueResponseOwner: {
    backgroundColor: COLORS.lightGray3,
    fontSize: SIZES.h3,
    padding: 10,
    overflow: "hidden",
    borderRadius: 20,
    width: 250,
    height: 45,
    right: 10,
    textAlign: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
    DeleteAnimalProps: state.DeleteAnimalReducer,
  };
};

export default connect(mapStateToProps)(AnimalBigScreen);

