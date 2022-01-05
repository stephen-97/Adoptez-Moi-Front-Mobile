import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  UIManager,
  Platform,
  LayoutAnimation,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, icons } from "../../constants";
import { tokenDecode } from "../utility/functions";
import { convertDateTime, convertDBDate } from "../utility/functions";
import { refreshToken } from "../utility/functions";
import ChangePassword from "./ChangePasswordView";
import Line from "../utility/Line";
import ChangeEmailView from "./ChangeEmailView";
import AnimalListToUser from "./AnimalListToUser";
import ConfirmMessage from "../utility/ConfirmMessage";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccountPageView = (props) => {
  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const [toggledEmail, setToggledEmail] = useState(false);
  const [toggled, setToggled] = useState(false);

  let data = {
    user: "",
    email: "",
  };
  let date = "";
  if (props.AuthProps.token) {
    data = tokenDecode(props.AuthProps.token);
    date = convertDateTime(data.createdAt.date);
  }

  const isVisible = useIsFocused();
  useEffect(() => {
    setToggled(false);
    setToggledEmail(false);
    console.log(props)
    refreshToken(props);
  }, [isVisible]);

  return (
    <>
      {!isEmpty(props.DeleteAnimalProps) ? <ConfirmMessage /> : null}
      <ScrollView>
        <View style={styles.block}>
          <TouchableOpacity
            onPress={() => props.navigation.push("AnimalForm")}
            style={styles.buttonCreateAvis}
          >
            <Text style={styles.textButton}>Créer une annonce</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.block}>
          <View style={styles.avisList}>
            <View style={styles.avisListTitleBlock}>
              <Text style={styles.title}>Annonces créés</Text>
            </View>
            <View>
              <AnimalListToUser />
            </View>
          </View>
        </View>
        <View style={styles.block}>
          <View style={styles.avisList}>
            <View style={styles.avisListTitleBlock}>
              <Text style={styles.title}>Information de compte</Text>
            </View>
            <View>
              <View style={styles.valuesViewRow}>
                <Text style={styles.titleText}>Identitfiant</Text>
                <Text style={styles.valueResponseOwner}>{data.user}</Text>
              </View>

              <View style={styles.line}></View>

              <View style={styles.valuesViewRow}>
                <Text style={styles.titleText}>Adresse mail</Text>
                <Text style={styles.valueResponseOwner}>{data.email}</Text>
              </View>

              <View style={styles.line}></View>

              <View style={styles.valuesViewRow}>
                <Text style={styles.titleText}>Créé le</Text>
                <Text style={styles.valueResponseOwner}>{convertDBDate(date)}</Text>
              </View>

              <View style={styles.line}></View>

              <View style={styles.valuesViewColumn}>
                <TouchableOpacity
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut
                    );
                    setToggledEmail(!toggledEmail);
                  }}
                  style={styles.toggleTouchable}
                >
                  <Text
                    style={[styles.valueResponse, { color: COLORS.tertiary }]}
                  >
                    Modifier adresse mail
                  </Text>
                  <Image
                    style={
                      toggledEmail
                        ? [
                            styles.arrow_icon,
                            { transform: [{ rotate: "-90deg" }] },
                          ]
                        : [
                            styles.arrow_icon,
                            { transform: [{ rotate: "90deg" }] },
                          ]
                    }
                    source={icons.arrowFwd}
                  />
                </TouchableOpacity>
                {toggledEmail ? <ChangeEmailView toggled={setToggled} /> : null}
              </View>

              <View style={styles.line}></View>
              <View style={styles.valuesViewColumn}>
                <TouchableOpacity
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut
                    );
                    setToggled(!toggled);
                  }}
                  style={styles.toggleTouchable}
                >
                  <Text
                    style={[styles.valueResponse, { color: COLORS.tertiary }]}
                  >
                    Modifier mot de passe
                  </Text>
                  <Image
                    style={
                      toggled
                        ? [
                            styles.arrow_icon,
                            { transform: [{ rotate: "-90deg" }] },
                          ]
                        : [
                            styles.arrow_icon,
                            { transform: [{ rotate: "90deg" }] },
                          ]
                    }
                    source={icons.arrowFwd}
                  />
                </TouchableOpacity>
                {toggled ? <ChangePassword toggled={setToggled} /> : null}
              </View>

              <View style={styles.line}></View>

              <View style={styles.valuesViewRow}>
                <TouchableOpacity
                  onPress={() => props.navigation.push("DeleteAccount")}
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

export default connect(mapStateToProps)(AccountPageView);

const styles = StyleSheet.create({
  block: {
    paddingVertical: 20,
  },
  buttonCreateAvis: {
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
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
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
  title: {
    alignSelf: "center",
    color: "black",
    borderTopEndRadius: SIZES.borderRadius2,
    fontSize: SIZES.h3,
  },
  valuesViewRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
  },
  valuesViewColumn: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
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
  valueResponse: {
    fontSize: SIZES.h3,
  },
  toggleTouchable: {
    width: "100%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow_icon: {
    height: 20,
    width: 15,
    position: "absolute",
    right: 30,
    opacity: 0.3,
  },
});
