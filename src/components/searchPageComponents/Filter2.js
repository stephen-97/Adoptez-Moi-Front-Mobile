import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { connect } from "react-redux";
import { COLORS, SIZES, departements } from "../../constants";
import Button from "../utility/Button";
import HeaderModalSecond from "../utility/HeaderModalSecond";

const Filter2 = (props) => {
  const speciesTab = [
    "chien",
    "chat",
    "rongueur",
    "volatile",
    "reptile",
    "autre",
  ];

  const [sex, setSex] = useState([]);
  const [department, setDepartment] = useState("");
  const [order, setOrder] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const [allSpecies, setAllSpecies] = useState(true);
  const [chien, setChien] = useState(null);
  const [chat, setChat] = useState(null);
  const [rongueur, setRongueur] = useState(null);
  const [volatile, setVolatile] = useState(null);
  const [reptile, setReptile] = useState(null);
  const [autres, setAutres] = useState(null);

  const changeStoreFilter = (data) => {
    const action = { type: "NEW_FILTER_DATA", dataFilter: data };
    props.dispatch(action);
  };


  useEffect(() => {
    if (props.FilterData.specie.length !== 0) {
      setAllSpecies(null);
      if (props.FilterData.specie.indexOf("chien") !== -1) {
        setChien("chien");
      }
      if (props.FilterData.specie.indexOf("chat") !== -1) {
        setChat("chat");
      }
      if (props.FilterData.specie.indexOf("rongueur") !== -1) {
        setRongueur("rongueur");
      }
      if (props.FilterData.specie.indexOf("volatile") !== -1) {
        setVolatile("volatile");
      }
      if (props.FilterData.specie.indexOf("reptile") !== -1) {
        setReptile("reptile");
      }
      if (props.FilterData.specie.indexOf("autre") !== -1) {
        setAutres("autre");
      }
    } else {
      setAllSpecies(true);
    }
    setOrder(props.FilterData.order);
    setPriceRange(props.FilterData.priceRange);
    setSex(props.FilterData.sex);
    setDepartment(props.FilterData.department);
  }, []);


  const onSubmit = () => {
    changeStoreFilter({
      sex: sex,
      specie: speciesArray(),
      order: order,
      department: department,
      priceRange: priceRange,
    });
    props.navigation.goBack(null);
  };


  const checkAllSpecies = () => {
    if (allSpecies) {
      setAllSpecies(false);
    }
  };

  const pressAllSpecies = () => {
    if (!allSpecies) {
      setChien(null);
      setChat(null);
      setRongueur(null);
      setVolatile(null);
      setReptile(null);
      setAutres(null);
      setAllSpecies(true);
    }
  };

  const speciesArray = () => {
    if (allSpecies === true) {
      return [];
    }
    const tab = [];
    if (chien) tab.push(chien);
    if (chat) tab.push(chat);
    if (rongueur) tab.push(rongueur);
    if (volatile) tab.push(volatile);
    if (reptile) tab.push(reptile);
    if (autres) tab.push(autres);
    return tab;
  };

  return (
    <>
      <View style={styles.container}>
        <HeaderModalSecond
          title="Filtre"
          extraStyle={{ backgroundColor: COLORS.secondary }}
          onPress={() => props.navigation.goBack(null)}
        />
        <ScrollView style={{ marginTop: 100 }}>
          <React.Fragment key="formikSearch">
            <View style={styles.form_view}>
              <View style={styles.textContainer}>
                <Text style={styles.form_text}>Ordre </Text>
              </View>
              <View style={styles.choicesBlock}>
                <TouchableOpacity
                  style={
                    order === null
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => setOrder(null)}
                >
                  <Text style={order === null ? { color: "white" } : null}>Plus récents</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    order === "prix croissant"
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => setOrder("prix croissant")}
                >
                  <Text style={order === "prix croissant" ? { color: "white" } : null}>Prix croissant</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    order === "prix decroissant"
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => setOrder("prix decroissant")}
                >
                  <Text style={order === "prix decroissant" ? { color: "white" } : null}>Prix décroissant</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    order === "plus ancient"
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => setOrder("plus ancient")}
                >
                  <Text style={order === "plus ancient" ? { color: "white" } : null}>Plus anciens</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.form_view}>
              <View style={styles.textContainer}>
                <Text style={styles.form_text}>Espèce </Text>
              </View>
              <View style={styles.choicesBlock}>
                <TouchableOpacity
                  style={
                    allSpecies === true
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => pressAllSpecies()}
                >
                  <Text style={allSpecies === true ? { color: "white" } : null}>Tout</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    chien
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => {
                    checkAllSpecies();
                    if (chien) {
                      if((chat || rongueur || volatile || reptile || autres) === null){
                        setAllSpecies(true);
                      }
                      setChien(null);
                    } else setChien("chien");
                  }}
                >
                  <Text style={chien ? { color: "white" } : null}>Chien</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    chat
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => {
                    checkAllSpecies();
                    if (chat) {
                      if((chien || rongueur || volatile || reptile || autres) === null){
                        setAllSpecies(true);
                      }
                      setChat(null);
                    } else setChat("chat");
                  }}
                >
                  <Text style={chat ? { color: "white" } : null}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    rongueur
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => {
                    checkAllSpecies();
                    if (rongueur) {
                      if((chien || chat || volatile || reptile || autres) === null){
                        setAllSpecies(true);
                      }
                      setRongueur(null);
                    } else setRongueur("rongueur");
                  }}
                >
                  <Text style={rongueur ? { color: "white" } : null}>Rongueur</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    volatile
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => {
                    checkAllSpecies();
                    if (volatile) {
                      if((chient || chat || rongueur || reptile || autres) === null){
                        setAllSpecies(true);
                      }
                      setVolatile(null);
                    } else setVolatile("volatile");
                  }}
                >
                  <Text style={volatile ? { color: "white" } : null}>Volatile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    reptile
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => {
                    checkAllSpecies();
                    if (reptile) {
                      if((chien || chat || rongueur || volatile || reptile) === null){
                        setAllSpecies(true);
                      }
                      setReptile(null);
                    } else setReptile("reptile");
                  }}
                >
                  <Text style={reptile ? { color: "white" } : null}>Reptile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    autres
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => {
                    checkAllSpecies();
                    if (autres) {
                      if((chien || chat || rongueur || volatile || reptile) === null){
                        setAllSpecies(true);
                      }
                      setAutres(null);
                    } else setAutres("autre");
                  }}
                >
                  <Text style={autres ? { color: "white" } : null}>Autres</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.form_view}>
              <View style={styles.textContainer}>
                <Text style={styles.form_text}>Sexe </Text>
              </View>
              <View style={styles.choicesBlock}>
                <TouchableOpacity
                  style={
                    sex === null
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => setSex(null)}
                >
                  <Text style={sex === null ? { color: "white" } : null}>Non précisé</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    sex === "male"
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => setSex("male")}
                >
                  <Text style={sex === "male" ? { color: "white" } : null}>Mâle</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    sex === "femelle"
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => setSex("femelle")}
                >
                  <Text style={sex === "femelle" ? { color: "white" } : null}>Femelle</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.form_view}>
              <View style={styles.textContainer}>
                <Text style={styles.form_text}>Tranche de prix </Text>
              </View>
              <View style={styles.choicesBlock}>
                <TouchableOpacity
                  style={
                    priceRange === null
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => setPriceRange(null)}
                >
                  <Text style={!priceRange ? { color: "white" } : null}>Illimité</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    JSON.stringify(priceRange) === JSON.stringify([0])
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => setPriceRange([0])}
                >
                  <Text style={JSON.stringify(priceRange) === JSON.stringify([0]) ? { color: "white" } : null}>Adoption</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    JSON.stringify(priceRange) === JSON.stringify([0, 500])
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => setPriceRange([0, 500])}
                >
                  <Text style={JSON.stringify(priceRange) === JSON.stringify([0, 500]) ? { color: "white" } : null}>1-500</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    JSON.stringify(priceRange) === JSON.stringify([500, 1000])
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => setPriceRange([500, 1000])}
                >
                  <Text style={JSON.stringify(priceRange) === JSON.stringify([500, 1000]) ? { color: "white" } : null}>501-1000</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    JSON.stringify(priceRange) === JSON.stringify([1000, 2000])
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => setPriceRange([1000, 2000])}
                >
                  <Text style={JSON.stringify(priceRange) === JSON.stringify([1000, 2000]) ? { color: "white" } : null}>1001-2000</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    JSON.stringify(priceRange) === JSON.stringify([2000])
                      ? [styles.smallBlock, styles.extraStylePressed]
                      : styles.smallBlock
                  }
                  onPress={() => setPriceRange([2000])}
                >
                  <Text style={JSON.stringify(priceRange) === JSON.stringify([2000]) ? { color: "white" } : null}>+2000</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.form_view}>
              <View style={styles.textContainer}>
                <Text style={styles.form_text}>Département </Text>
              </View>
              <View style={styles.choicesBlock}>
                <Picker
                  style={[styles.picker_style, { marginRight: 50 }]}
                  selectedValue={department}
                  onValueChange={(e) => setDepartment(e)}
                  itemStyle={styles.picker_item}
                >
                  <Picker.Item label="Non précisé" value={null} />
                  {departements.map((item, i) => (
                    <Picker.Item key={i} label={item} value={item} />
                  ))}
                </Picker>
              </View>
            </View>
            <Button
              onPress={() => onSubmit()}
              name="Soumettre"
              extraStyle={{ margin: 20 }}
            />
            <View style={{height: 50}}></View>
          </React.Fragment>
        </ScrollView>
      </View>
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
  container: {
    position: "absolute",
    alignSelf: "center",
    width: "100%",
    marginTop: "2.5%",
    marginBottom: "2.5%",
    borderRadius: 10,
    backgroundColor: "#98dfea",
    height: "100%",
    overflow: "hidden",
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
    flexDirection: "column",
    alignItems: "center",
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
    height: 35,
    width: "100%",
  },
  textContainerPrice: {
    justifyContent: "center",
    height: 50,
  },
  form_text: {
    fontSize: 20,
    marginLeft: 10,
    color: "gray",
  },
  picker_style: {
    height: 60,
    width: 250,
    borderRadius: 50,
    backgroundColor: "white",
  },
  picker_item: {
    height: 60,
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
  smallBlock: {
    padding: 12,
    minWidth: 70,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: "white",
  },
  choicesBlock: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    width: "100%",
  },
  extraStylePressed: {
    backgroundColor: COLORS.tertiary,
    borderColor: COLORS.tertiary,
  },
});


/**
 * <View style={styles.form_view_price}>
              <View style={styles.textContainerPrice}>
                <Text style={styles.form_text}>Prix </Text>
              </View>
              <Slider
                value={price}
                maximumValue={3000}
                onValueChange={(e) => setPrice(parseInt(e))}
              />
              <Text>{parseInt(price)} €</Text>
            </View>
 */