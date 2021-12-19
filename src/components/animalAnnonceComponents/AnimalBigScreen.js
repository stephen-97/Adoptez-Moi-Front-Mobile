import React from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import { tokenDecode } from "../utility/functions";
import { COLORS, SIZES } from "../../constants";
import SERVER from "../../../config";
import AnimalInfo from "./AnimalInfo";
import OwnerInfo from "./OwnerInfo";
import AlerteInfo from "./AlerteInfo";
import CloseModal from "../utility/CloseModalButton";
import ButtonDeleteAdmin from "../utility/ButtonDeleteAdmin";

const { width, height } = Dimensions.get("window");

const AnimalBigScreen = (props) => {
  const valueSlider = ["Animal", "Maître", "Autres"];

  const data = [0, 1, 2];
  const scrollX = new Animated.Value(0);
  const position = Animated.divide(scrollX, width);

  return (
    <View style={styles.container}>
      {props.AuthProps.token ? (
        <>
          {tokenDecode(props.AuthProps.token).role.includes("ROLE_ADMIN") ? (
            <ButtonDeleteAdmin
              name="supprimer"
              extraStyle={{
                position: "absolute",
                top: 40,
                right: 20,
                zIndex: 1,
              }}
              onPress={() => props.navigation.push("AnimalDeleteAdmin", {data :props.route.params.data})}
            />
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
        renderItem={({item, index}) => {
          return (
            <View style={styles.flatListContainer} key={index.toString()}>
              {index === 0 ? <AnimalInfo data={props.route.params.data} /> : null}
              {index === 1 ? <OwnerInfo data={props.route.params.data} /> : null}
              {index === 2 ? (
                <AlerteInfo
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
    //backgroundColor: "#98dfeb",
    //backgroundColor: "#0dafd7",
    backgroundColor: COLORS.secondaryLight,
    borderRadius: 50,
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
    //backgroundColor: "#38cbf0",
    //backgroundColor: "#98dfeb",
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

