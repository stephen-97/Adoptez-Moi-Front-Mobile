import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { tokenDecode } from "../utility/functions";
import SERVER from "../../../config";
import { COLORS, SIZES } from "../../constants";
import LoaderSpinner from "../utility/LoaderSpinner";
import BottomMessage2 from "../utility/BottomMessage2";

const FaqPage = (props) => {

  return (
    <ScrollView style={styles.page}>
      <View style={styles.connect}>
        <View style={styles.connexionTitle}>
          <Text style={styles.connexionTitleText}>L'application</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>
            "Prenez moi" est une application pour vendre ou donner des animaux
            à des particuliers. Les annonces peuvent être originaire d'un particulier
            ou d'une société. 
          </Text>
        </View>
      </View>

      <View style={styles.connect}>
        <View style={styles.connexionTitle}>
          <Text style={styles.connexionTitleText}>La zone géographique? </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>
            Pour le moment la zone est limité au térritoire français. Seuls des téléphones +33,
            par conséquent les animaux dont la vente nécessite des documents doivent être traduit 
            en Français.
          </Text>
        </View>
      </View>

      <View style={styles.connect}>
        <View style={styles.connexionTitle}>
          <Text style={styles.connexionTitleText}>Avant de poster une annonce </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>
            IMPORTANT : 
            La vente d'animaux est soumis à la loi française. Tout le règlement est
            explicité dans le site du gouvernement français "Service public".
            Toutes personnes ne respectant pas ces lois pourra faire l'objet de poursuite judicière.
          </Text>
        </View>
      </View>

      <View style={styles.connect}>
        <View style={styles.connexionTitle}>
          <Text style={styles.connexionTitleText}>Les arnaques</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>
            {`  Il est essentiel que tout utilisateur et visiteur de l'application se doit de vérifier le plus possible une annonce. Pour ceci la loi française concernant la vente d'animaux est impérativement à connaître. 

    Si vous parvenez à organiser un rendez vous pour rencontrez l'animal, soyez sur que tout ce qui a été dit est correct. S'il est nécessaire, il est également recommandé qu'un acheteur contacte un spécialiste  pour vérifier l'authenticité d'un papier pour éviter tout type de fraudes. 
            
    Tout utilisateur postant des annonces frauduleuse sera banni, en cas de plainte, les données liés à son compte pourront être fournis.`}
          </Text>
        </View>
      </View>

      <View style={styles.connect}>
        <View style={styles.connexionTitle}>
          <Text style={styles.connexionTitleText}>Je me suis fait arnaqué</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>
            Envoyez un mail en mentionnant le compte de l'utilisateur à quoi
            vous avez parlé. Fournisez toutes les preuves possible de l'arnaque,
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  page: {
    height: "100%",
    width: "100%",
    backgroundColor: "white", //#e3f6f5
  },
  connect: {
    alignSelf: "center",
    backgroundColor: COLORS.lightGray2,
    borderRadius: 20,
    width: "90%",
    marginVertical: 10,
  },
  connexionTitle: {
    backgroundColor: COLORS.darkgray,
    padding: 10,
    overflow: "hidden",
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    width: "100%",
  },
  connexionTitleText: {
    fontSize: SIZES.h2,
    textAlign: "center",
    color: "white",
  },
  content: {
    padding: 10,
  },
  text: {
    fontSize: 15,
  }
});

export default FaqPage;
