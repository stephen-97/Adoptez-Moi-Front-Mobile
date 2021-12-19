import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Animated, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { connect } from "react-redux";
import { COLORS, SIZES, departements } from "../../constants";
import Button from "../utility/Button";
import Slider from "@react-native-community/slider";

const Filter2 = (props) => {
  const [touchable, setTouchable] = useState(false);

  const animValue = useRef(new Animated.Value(-550)).current;
  const animValueOpacity = useRef(new Animated.Value(0)).current;
  const [toggle, setToggle] = useState(false);
  const [sex, setSex] = useState("");
  const [specie, setSpecie] = useState("");
  const [department, setDepartment] = useState("");
  const [price, setPrice] = useState(3000);


  const changeStoreFilter = (data) => {
    const action = { type: "NEW_FILTER_DATA", dataFilter: data };
    props.dispatch(action);
  };

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: -10,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(animValueOpacity, {
      toValue: 0.6,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setTouchable(true));
  }, []);

  const onSubmit= () => {
    changeStoreFilter({
      sexe: sex,
      espece: specie,
      department: department,
      price: price,
    });
    setTouchable(false);
    Animated.timing(animValue, {
      toValue: -550,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(animValueOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => props.navigation.goBack(null));
  };


  const closeFilter = () => {
    setTouchable(false);
    Animated.timing(animValue, {
      toValue: -550,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(animValueOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => props.navigation.goBack(null));
  };

  return (
    <>
      <Animated.View
        style={[styles.fullContainer, { opacity: animValueOpacity }]}
      >
        <TouchableOpacity
          style={styles.touchableBackground}
          onPress={() => (touchable ? closeFilter() : null)}
        />
      </Animated.View>
      <Animated.View style={[styles.container, { bottom: animValue }]}>
        <SafeAreaView>
          <React.Fragment key="formikSearch">
            <View style={styles.form_view}>
              <View style={styles.textContainer}>
                <Text style={styles.form_text}>Espèce </Text>
              </View>
              <Picker
                style={styles.picker_style}
                selectedValue={specie}
                onValueChange={(e) => setSpecie(e)}
                itemStyle={styles.picker_item}
              >
                <Picker.Item label="Non précisé" value="" />
                <Picker.Item label="Chien" value="Chien" />
                <Picker.Item label="Chat" value="Chat" />
                <Picker.Item label="Rongueur" value="Rongueur" />
                <Picker.Item label="Volatile" value="Volatile" />
                <Picker.Item label="Reptile" value="Reptile" />
                <Picker.Item label="Autres" value="Autres" />
              </Picker>
            </View>
            <View style={styles.form_view}>
              <View style={styles.textContainer}>
                <Text style={styles.form_text}>Sexe </Text>
              </View>
              <Picker
                style={styles.picker_style}
                selectedValue={sex}
                onValueChange={(e) => setSex(e)}
                itemStyle={styles.picker_item}
              >
                <Picker.Item label="Non précisé" value="" />
                <Picker.Item label="Femelle" value="Femelle" />
                <Picker.Item label="Mâle" value="Mâle" />
              </Picker>
            </View>

            <View style={styles.form_view_price}>
              <View style={styles.textContainerPrice}>
                <Text style={styles.form_text}>Prix Maximal</Text>
              </View>
              <Slider
                value={price}
                maximumValue={3000}
                onValueChange={(e) => setPrice(parseInt(e))}
              />
              <Text>{parseInt(price)} €</Text>
            </View>

            <View style={styles.form_view}>
              <View style={styles.textContainer}>
                <Text style={styles.form_text}>Département </Text>
              </View>
              <Picker
                style={styles.picker_style}
                selectedValue={department}
                onValueChange={(e) => setDepartment(e)}
                itemStyle={styles.picker_item}
              >
                <Picker.Item label={"Non précisé"} value={""} />
                {departements.map((item, i) => (
                  <Picker.Item key={i} label={item} value={item} />
                ))}
              </Picker>
            </View>
            <Button
              onPress={() => onSubmit()}
              name="Soumettre"
              extraStyle={{ margin: 20 }}
            />
          </React.Fragment>
        </SafeAreaView>
      </Animated.View>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    FilterData: state.FilterReducer,
  };
};

export default connect(mapStateToProps)(Filter2);

const styles = StyleSheet.create({
  fullContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "black"
  },
  container: {
    position: "absolute",
    alignSelf: "center",
    width: "100%",
    marginTop: "2.5%",
    marginBottom: "2.5%",
    borderRadius: 10,
    backgroundColor: "#98dfeb",
    bottom: -500,
  },
  touchableBackground: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  touchableItems: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  },
  form_inputText: {
    fontSize: 20,
    flex: 1,
    backgroundColor: "white",
    height: 50,
  },
  form_view: {
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    marginVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  form_view_price: {
    flexDirection: "column",
    justifyContent: "center",
    height: 80,
    marginVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  textContainer: {
    justifyContent: "center",
    height: 50,
    width: 130,
  },
  textContainerPrice: {
    justifyContent: "center",
    height: 50,
  },
  form_text: {
    fontSize: 20,
    marginLeft: 10,
  },
  picker_style: {
    flex: 1,
    height: 50,
    borderRadius: SIZES.borderRadius2,
    backgroundColor: COLORS.secondary,
  },
  picker_item: {
    height: 50,
    fontSize: 20,
  },
  toggleTitle: {
    height: 30,
    padding: 5,
    borderColor: "black",
    alignItems: "flex-start",
    borderTopColor: "#00000030",
    borderTopWidth: 1,
    marginHorizontal: 10,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  prix: {
    fontSize: SIZES.h2,
    textAlign: "center",
    marginVertical: 10,
  },
});
