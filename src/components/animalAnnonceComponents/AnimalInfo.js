import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { SIZES } from "../../constants";
import Line from "../utility/Line";
import Button from "../utility/Button";

const AnimalInfo = (props) => {
  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.valuesView}>
          <View style={styles.valueContainer}>
            <Text style={styles.title}>Espèce</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.valueResponse}>{props.data.species}</Text>
          </View>
        </View>

        <Line color="rgba(0,0,0,0.1)" />

        <View style={styles.valuesView}>
          <View style={styles.valueContainer}>
            <Text style={styles.title}>Nom</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.valueResponse}>{props.data.name}</Text>
          </View>
        </View>

        <Line color="rgba(0,0,0,0.1)" />

        <View style={styles.valuesView}>
          <View style={styles.valueContainer}>
            <Text style={styles.title}>Sexe</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.valueResponse}>{props.data.sex}</Text>
          </View>
        </View>

        <Line color="rgba(0,0,0,0.1)" />

        <View style={styles.valuesView}>
          <View style={styles.valueContainer}>
            <Text style={styles.title}>Race</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.valueResponse}>
              {props.data.race !== "" ? props.data.race : `(Non précisé)`}
            </Text>
          </View>
        </View>

        <Line color="rgba(0,0,0,0.1)" />

        <View style={styles.valuesView}>
          <View style={styles.valueContainer}>
            <Text style={styles.title}>Département</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.valueResponse}>{props.data.department}</Text>
          </View>
        </View>
        {props.data.species === "chat" || props.data.species === "chien" ? (
          <>
            <Line color="rgba(0,0,0,0.1)" />

            <View style={styles.valuesView}>
              <View style={styles.valueContainer}>
                <Text style={styles.title}>Identifiant</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.valueResponse}>
                  {props.data.identification_number}
                </Text>
              </View>
            </View>

            <Line color="rgba(0,0,0,0.1)" />

            <View style={styles.valuesView}>
              <View style={styles.valueContainer}>
                <Text style={styles.title}>Méthode</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.valueResponse}>
                  {props.data.chip_or_tatoo}
                </Text>
              </View>
            </View>
          </>
        ) : null}

        <Line color="rgba(0,0,0,0.1)" />

        <View style={styles.valuesView}>
          <View style={styles.valueContainer}>
            <Text style={styles.title}>Prix</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.valueResponse}>{props.data.price} €</Text>
          </View>
        </View>

        <Line color="rgba(0,0,0,0.1)" />
        
        <View style={styles.valuesTextAreaView}>
          <View style={styles.valueContainer}>
            <Text style={styles.title}>Informations</Text>
          </View>
          <View style={styles.valueTextAreaContainer}>
            <Text style={styles.valueTextAreaResponse}>
              {props.data.description}
            </Text>
          </View>
        </View>

        <Line color="rgba(0,0,0,0.3)" />

        <View style={styles.buttonView}>
          <Button name="Voir localisation" onPress={() => null} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  valuesView: {
    flexDirection: "row",
    height: 70,
    justifyContent: "center",
  },
  title: {
    textAlign: "left",
    overflow: "hidden",
    width: 150,
    alignSelf: "center",
    marginLeft: 30,
    fontSize: SIZES.h4,
    fontWeight: "bold",
    color: "rgb(85,85,85)",
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
  valueTextAreaResponse: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    color: "rgb(85,85,85)",
    fontSize: SIZES.h4,
  },
  valueTextAreaContainer: {
    margin: 20,
    height: 200,
    borderRadius: SIZES.borderRadius2,
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 2,
  },
  valuesTextAreaView: {
    paddingVertical: 10,
  },
  scrollView: {
    paddingTop: 10,
  },
  buttonView: {
    paddingTop: 10,
    paddingBottom: 20,
  },
});

export default AnimalInfo;
