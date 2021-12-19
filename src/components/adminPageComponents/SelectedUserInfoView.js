import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, SIZES, icons } from "../../constants";
import { convertDate, convertDBDate } from "../utility/functions";
import AnimalListForAnUser from "./AnimalListForAnUser";

const SelectedUserInfoView = (props) => {
  let data = props.route.params.data;
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
          <Image style={styles.image} source={icons.arrowFwd} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.block}>
          <View style={styles.avisList}>
            <View style={styles.avisListTitleBlock}>
              <Text style={styles.title}>Information de compte</Text>
            </View>
            <View>
              <View style={styles.valuesViewRow}>
                <Text style={styles.titleText}>Identitfiant</Text>
                <Text style={styles.valueResponseOwner}>{data.username}</Text>
              </View>

              <View style={styles.line}></View>

              <View style={styles.valuesViewRow}>
                <Text style={styles.titleText}>Adresse mail</Text>
                <Text style={styles.valueResponseOwner}>{data.email}</Text>
              </View>

              <View style={styles.line}></View>

              <View style={styles.valuesViewRow}>
                <Text style={styles.titleText}>Créé le</Text>
                <Text style={styles.valueResponseOwner}>
                  {convertDate(data.created_at)}
                </Text>
              </View>

              <View style={styles.line}></View>

              <View style={styles.valuesViewRow}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.push("AdminDeleteUserAccount")
                  }
                  style={styles.toggleTouchable}
                >
                  <Text style={[styles.valueResponse, { color: "red" }]}>
                    Supprimer compte
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.block}>
          <View style={styles.avisList}>
            <View style={styles.avisListTitleBlock}>
              <Text style={styles.title}>Annonces créés</Text>
            </View>
            <AnimalListForAnUser data={data} navigation={props.navigation} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
    DeleteAnimalProps: state.DeleteAnimalReducer,
  };
};

export default connect(mapStateToProps)(SelectedUserInfoView);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 120,
  },
  image: {
    height: 50,
    width: 50,
    position: "absolute",
    top: 50,
    left: 30,
    transform: [{ rotate: "180deg" }],
  },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 120,
    backgroundColor: COLORS.secondary,
    zIndex: 1,
  },
  block: {
    paddingVertical: 20,
  },
  avisList: {
    backgroundColor: COLORS.lightGray3,
    width: "90%",
    alignSelf: "center",
    borderRadius: SIZES.borderRadius2,
  },
  avisListTitleBlock: {
    padding: SIZES.padding,
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    borderTopStartRadius: SIZES.borderRadius2,
    borderTopEndRadius: SIZES.borderRadius2,
  },
  valuesViewRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
  },
  titleText: {
    fontSize: SIZES.h3,
    color: COLORS.darkgray,
    width: 140,
    paddingLeft: 20,
    textAlign: "left",
  },
  valueResponseOwner: {
    fontSize: SIZES.body3,
    flex: 1,
    textAlign: "center",
  },
  toggleTouchable: {
    width: "100%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  valueResponse: {
    fontSize: SIZES.h3,
  },
  title: {
    alignSelf: "center",
    color: "black",
    borderTopEndRadius: SIZES.borderRadius2,
    fontSize: SIZES.h3,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
});
