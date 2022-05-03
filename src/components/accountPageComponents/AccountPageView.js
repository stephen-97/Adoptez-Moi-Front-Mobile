import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
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
import { tokenDecode, userHaveNewMessages } from "../utility/functions";
import { convertDateTime, convertDBDate } from "../utility/functions";
import * as ImagePicker from "expo-image-picker";
import { refreshToken } from "../utility/functions";
import ChangePassword from "./ChangePasswordView";
import SERVER from "../../../config";
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
  const firstUpdate = useRef(true);
  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const [avatar, setAvatar] = useState(null);
  const [dataResponse, setDataResponse] = useState(null);

  const handleChoosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setAvatar({
        uri: result.uri,
        data: result.base64,
      });
    }
  };

  const chosseBasicAvatar = () => {
    setAvatar(null);
  };

  /**const changeStoreAuth = (data) => {
    const action = { type: "AUTH_PROPS", authentificationProps: data };
    props.dispatch(action);
  };**/

  const changeAvatar = () => {
    const formData = new FormData();
    if (avatar) formData.append("avatar", avatar.data);
    return fetch(`http://${SERVER.NAME}/managerUser/newAvatar`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: props.AuthProps.token,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((jsonData) => {
        if (jsonData.status === 200) {
          refreshToken(props);
          //changeStoreAuth(jsonData);
          setDataResponse(jsonData);
        }
      });
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
  }, [isVisible]);

  useEffect(() => {
    if (props.AuthProps.token) {
      data = tokenDecode(props.AuthProps.token);
      date = convertDateTime(data.createdAt.date);
    }
  }, [props.AuthProps]);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    changeAvatar();
  }, [avatar]);

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
        <View style={styles.blockMessage}>
          <TouchableOpacity
            onPress={() => props.navigation.push("FavoritesAnimals")}
            style={styles.basicButton}
          >
            <>
              <Text style={styles.textButton}>Favoris</Text>
              <Image style={styles.firstIcons} source={icons.heartWhite} />
            </>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.push("UsersMessages")}
            style={styles.basicButton}
          >
            <>
              <Text style={styles.textButton}>Messages</Text>
              <View>
                <Image style={styles.firstIcons} source={icons.messager} />
                {userHaveNewMessages(props) ? <View style={styles.redPoint}></View> : null}
              </View>
            </>
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
              <View style={[styles.valuesViewRow]}>
                <Text style={styles.titleText}>Avatar</Text>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Image
                    style={styles.image}
                    source={
                      data.avatar
                        ? {
                            uri: `http://${SERVER.NAME}/avatar/${data.avatar}`,
                          }
                        : icons.accountLogo
                    }
                  />
                </View>
              </View>

              <View style={styles.line}></View>

              <View
                style={[styles.valuesViewRow, { justifyContent: "center" }]}
              >
                <Text
                  style={styles.avatarText}
                  onPress={() => handleChoosePhoto()}
                >
                  Changer Avatar
                </Text>
                <Text>  -  </Text>
                <Text
                  style={styles.avatarText}
                  onPress={() => chosseBasicAvatar()}
                >
                  défault
                </Text>
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
  blockMessage: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonCreateAvis: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: SIZES.padding2,
    backgroundColor: COLORS.tertiary,
    borderRadius: 5,
  },
  basicButton: {
    width: 170,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-around",
    padding: SIZES.padding2,
    backgroundColor: COLORS.tertiary,
    borderRadius: 10,
    flexDirection: "row",
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
  image: {
    height: 55,
    width: 55,
    borderRadius: 50,
  },
  avatarText: {
    color: COLORS.tertiary,
    fontSize: SIZES.h3,
  },
  avatarText2: {
    color: COLORS.tertiary,
    fontSize: SIZES.h4,
  },
  firstIcons: {
    height: 30,
    width: 30,
  },
  redPoint: {
    width: 12,
    height: 12,
    position: "absolute",
    backgroundColor: "red",
    zIndex: 1,
    borderRadius: 50,
    top: -3,
    right: -3,
  },
});
