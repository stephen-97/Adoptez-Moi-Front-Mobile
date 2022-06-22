/**import  React, {useState} from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { Component } from "react";
import { connect } from "react-redux";

import { Formik } from "formik";
import { arrowFwd } from "../../constants/icons";
import { COLORS, SIZES } from "../../constants";
import { departements } from "../../constants";
import Button from "../utility/Button";
import Slider from "@react-native-community/slider";

const Filter = (props) => {
  const initialValues = {
    sexe: "",
    espece: "",
    department: "",
    price: 3000,
  };
  const [toggle, setToggle] = useState(false);
  const [sex, setSex] = useState("");
  const [specie, setSpecie] = useState("");
  const [department, setDepartment] = useState("");
  const [price, setPrice] = useState(3000);

  const ToggleExtraMenu = () => {
    setToggle(!toggle);
  };

  const changeStoreFilter = (data) => {
    const action = { type: "NEW_FILTER_DATA", dataFilter: data };
    props.dispatch(action);
  };

  const onSubmit= () => {
    
  }
  return (
    <View style={styles.container}>
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
            onPress={() =>
              changeStoreFilter({
                sexe: sex,
                espece: specie,
                department: department,
                price: price,
              })}
              name={"Soumettre"}
              extraStyle={{margin: 20}}
            />
        </React.Fragment>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    FilterData: state.FilterReducer,
  };
};

export default connect(mapStateToProps)(Filter);

const styles = StyleSheet.create({
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
  container: {
    alignSelf: "center",
    width: "95%",
    marginTop: "2.5%",
    marginBottom: "2.5%",
    borderRadius: 10,
  },
  form_view: {
    flexDirection: "row",
    alignItems: "center",
    height: 120,
    marginVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  form_view_price: {
    flexDirection: "column",
    justifyContent: "center",
    height: 120,
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
    height: 100,
    borderRadius: SIZES.borderRadius2,
    backgroundColor: COLORS.secondary,
  },
  picker_item: {
    height: 100,
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

**/