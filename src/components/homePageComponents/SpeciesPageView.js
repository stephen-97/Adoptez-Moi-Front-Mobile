import React, { useEffect, useState} from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import SERVER from "../../../config";
import RenderOthersAnimalFromUser from "../utility/RenderOtherAnimal";
import HeaderModal from "../utility/HeaderModal";
import { COLORS, SIZES } from "../../constants";

const SpeciesPageView = (props) => {
  const [departmentData, setDepartmentData] = useState([]);
  const [annonces, setAnnonces] = useState([]);
  const loadingVerifCounter = 2;
  const [isLoading, setIsLoading] = useState(0);

  const getCountTopMostPopularDepartment = () => {
    fetch(
      `http://${SERVER.NAME}/statistics/species/count/department/${props.route.params.species}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((jsonData) => {
        setDepartmentData(jsonData);
        setIsLoading(isLoading + 1);
      });
  };

  const getRandomAnnonceForThisSpecies = () => {
    fetch(
      `http://${SERVER.NAME}/wanted/randomAnimal/${props.route.params.species}/5`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((jsonData) => {
        setAnnonces(jsonData);
        setIsLoading(isLoading + 1);
      });
  };

  useEffect(() => {
    setIsLoading(0);
    getCountTopMostPopularDepartment();
    getRandomAnnonceForThisSpecies();
  }, []);
  const styles = StyleSheet.create({
    container: {
      borderRadius: 40,
      height: "100%",
      width: "100%",
      backgroundColor: props.route.params.color,
    },
    text: {
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    description: {
      paddingVertical: 10,
      fontSize: 15,
    },
    numberOfAnnonce: {
      fontSize: 22,
      paddingVertical: 10,
      color: COLORS.darkgray,
    },
    departmentTitle: {
      fontSize: 22,
      paddingVertical: 10,
      color: COLORS.darkgray,
    },
    departmentValues: {
      fontSize: SIZES.h2,
    },
    headerExtraStyle: {
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      backgroundColor: props.route.params.color2,
    },
    textContainer: {
      padding: 10,
      backgroundColor: props.route.params.color2,
      marginVertical: 10,
      borderRadius: 10,
    },
    annoncesBlock: {
      fontSize: 22,
      paddingVertical: 15,
      color: COLORS.darkgray,
      textAlign: "center",
    },
  });
  return (
    <>
      <HeaderModal
        onPress={() => props.navigation.goBack(null)}
        extraStyle={styles.headerExtraStyle}
      />
      <ScrollView style={styles.container}>
        <View style={{ height: 120 }}></View>
        {isLoading ? (
          <View style={styles.text}>
            <View style={styles.textContainer}>
              <Text style={styles.description}>
                Regroupe tout les chats domestiques (et non sauvage) qui
                constituent plus d'une centaine de race répertorié. Obligation
                légal d'indentification est mise en rigueur par la loi
                française.
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.numberOfAnnonce}>
                Annonces postés : {}
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  {props.route.params.count}
                </Text>
              </Text>
              <Text style={styles.departmentTitle}>
                Départements avec le plus d'annonces
              </Text>
              {Object.entries(departmentData).map((value, i) => (
                <Text key={i} style={styles.departmentValues}>
                  {value[0]} : <Text style={{fontWeight: "bold"}}>{value[1]}</Text>
                </Text>
              ))}
            </View>
            <View style={[styles.textContainer, { marginVertical: 30 }]}>
              <Text style={styles.annoncesBlock}>Annonces intéressante</Text>
              {annonces.map((elem, i) => (
                <>
                  <RenderOthersAnimalFromUser
                    key={i}
                    species={elem.species}
                    name={elem.name}
                    image={`http://${SERVER.NAME}/upload/${elem.images[0].name}`}
                  />
                </>
              ))}
            </View>
          </View>
        ) : null}
      </ScrollView>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
  };
};

export default connect(mapStateToProps)(SpeciesPageView);
