import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  UIManager,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import SERVER from "../../../config";
import { COLORS, SIZES, departements } from "../../constants";
import Button from "../utility/Button";
import Line from "../utility/Line";
import MiniButton from "../utility/MiniButton";
import { tokenDecode } from "../utility/functions";

import LoaderSpinner from "../utility/LoaderSpinner";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AnimalFormView = (props) => {

  let data = {
    user: "",
    email: "",
  };
  if (props.AuthProps.token) {
    data = tokenDecode(props.AuthProps.token);
  }

  const raceChienArray = [
    "Beagle",
    "Berger australien",
    "Cavalier king charles",
    "Chien de berger belge",
    "Cocker spaniel anglais",
    "Golden retriever",
    "Retriever du labrador",
    "Setter anglais",
    "Staffordshire bull terrier",
    "Staffordshrine terrier américain",
    "Autre",
  ];

  const raceChatArray = [
    "Bengal",
    "British Shorthair",
    "Chartreux",
    "Maine Coon",
    "Norvégien",
    "Persan",
    "Ragdoll",
    "Sacré de Birmanie",
    "Siamois",
    "Sphynx",
    "Autre",
  ];

  const verificationValue = props.species === "chat" || props.species === "chien" ? 7 : 6;
  //spiner
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(false);

  //variables
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [ageMonthOrYear, setAgeMonthOrYear] = useState("mois");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [sex, setSex] = useState("Femelle");
  const [specie, setSpecie] = useState("Chien");
  const [race, setRace] = useState("");
  const [departement, setDepartement] = useState("Paris 75");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [chipOrTatoo, setChipOrTatoo] = useState("Puce");
  const [vaccinated, setVaccinated] = useState(false);
  const [image, setImage] = useState(null);

  //vérifications
  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [idNumberError, setIdNumberError] = useState(false);

  const handleChoosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage({
        uri: result.uri,
        data: result.base64,
      });
    }
  };

  const verification = () => {
    let i = 0;
    if (!name.trim()) {
      setNameError(true);
    } else {
      setNameError(false);
      i += 1;
    }
    if (!price.trim()) {
      setPriceError(true);
    } else {
      setPriceError(false);
      i += 1;
    }
    if (!description.trim()) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
      i += 1;
    }
    if (!/^\d+$/.test(price)) {
      setPriceError(true);
    } else {
      setPriceError(false);
      i += 1;
    }
    if (age !== "") {
      if (!/^\d+$/.test(age)) {
        setAgeError(true);
      } else {
        setAgeError(false);
        i += 1;
      }
    } else {
      setAgeError(false);
      i += 1;
    }
    if (phoneNumber !== "") {
      if (!/^\d+$/.test(phoneNumber) && phoneNumber.length !== 10) {
        setPhoneError(true);
      } else {
        setPhoneError(false);
        i += 1;
      }
    } else {
      setPhoneError(false);
      i += 1;
    }
    if (!image) {
      setImageError(true);
    } else {
      setImageError(false);
      
    }
    if (identificationNumber.length !== 15) {
      setIdNumberError(true);
    } else {
      setIdNumberError(false);
      i += 1;
    }
    return i === verificationValue;
  };

  const sendData = () => {
    if (verification()) {
      setLoading(true);
      setResultData(true);
      let completeAge = age;
      if (age !== "") {
        completeAge = `${age} ${ageMonthOrYear}`;
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", parseInt(price, 10));
      formData.append("sex", sex);
      formData.append("age", completeAge);
      formData.append("species", props.species);
      formData.append("race", race);
      formData.append("description", description);
      formData.append("departement", departement);
      formData.append("phoneNumber", phoneNumber);
      formData.append("chipOrTatoo", chipOrTatoo);
      formData.append("vaccinated", vaccinated);
      formData.append("identificationNumber", identificationNumber);
      formData.append("image", image.data);
      return fetch(`http://${SERVER.NAME}/animal/new/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: props.AuthProps.token,
        },
        body: formData,
      })
        .then((response) => response.text())
        .then((jsonData) => {
          console.log(jsonData);
          if (jsonData.status === 200) setLoading(false);
        });
    }
    return null;
  };

  const isVisible = useIsFocused();
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    setName("");
    setAge("");
    setAgeMonthOrYear("mois");
    setPrice("");
    setDescription("");
    setSpecie(props.species);
    setRace("");
    setDepartement("Paris 75");
    setIdentificationNumber("");
    setVaccinated(false);
    setImage(null);
    setLoading(false);
    setResultData(false);
  }, [isVisible]);

  return (
    <>
      <ScrollView>
        <Text
          style={styles.backButton}
          onPress={() => props.onChangeForm(false)}
        >
          Retour
        </Text>
        <View style={styles.block}>
          <View style={styles.avisList}>
            <View style={[styles.avisListTitleBlock, {backgroundColor: props.color}]}>
              <Text style={styles.title}>{props.species}</Text>
            </View>
            {!resultData ? (
              <View>
                <View style={styles.inputBlock}>
                  <Text style={styles.inputTitle}>Nom *</Text>
                  <TextInput
                    placeholder="Nom"
                    style={
                      !nameError
                        ? styles.textInput
                        : [styles.textInput, { borderColor: "red" }]
                    }
                    autoCapitalize="none"
                    onChangeText={(e) => setName(e)}
                    onFocus={() => setNameError(false)}
                    defaultValue={name}
                  />
                </View>
  
                <View style={{ marginVertical: 15 }}>
                  <Line color="rgba(255,255,255,255.3)" />
                </View>
  
                <View style={styles.inputBlock}>
                  <Text style={styles.inputTitle}>Age</Text>
                  <View style={styles.ageBlock}>
                    <TextInput
                      placeholder="Age"
                      style={
                        !ageError
                          ? styles.textInputAge
                          : [styles.textInputAge, { borderColor: "red" }]
                      }
                      autoCapitalize="none"
                      onChangeText={(e) => setAge(e)}
                      onFocus={() => setAgeError(false)}
                      defaultValue={age}
                    />
                    <Picker
                      style={styles.pickerAge}
                      itemStyle={styles.pickerItemAge}
                      selectedValue={ageMonthOrYear}
                      onValueChange={(e) => setAgeMonthOrYear(e)}
                    >
                      <Picker.Item label="mois" value="mois" />
                      <Picker.Item label="ans" value="ans" />
                    </Picker>
                  </View>
                </View>

                {props.species === "chat" || props.species === "chien" ? (
                  <>
                    <View style={{ marginVertical: 15 }}>
                      <Line color="rgba(255,255,255,255.3)" />
                    </View>
                    <View style={styles.inputBlock}>
                      <Text style={styles.inputTitle}>
                        Numéro d'identification *
                      </Text>
                      <TextInput
                        placeholder="15 chiffres"
                        style={
                          !idNumberError
                            ? styles.textInput
                            : [styles.textInput, { borderColor: "red" }]
                        }
                        autoCapitalize="none"
                        onFocus={() => setIdNumberError(false)}
                        onChangeText={(e) => setIdentificationNumber(e)}
                        defaultValue={price}
                      />
                    </View>
                    <View style={{ marginVertical: 15 }}>
                      <Line color="rgba(255,255,255,255.3)" />
                    </View>
                    <View style={styles.inputBlock}>
                      <Text style={styles.inputTitle}>
                        Méthode d'identification *
                      </Text>
                      <View style={styles.touchableContainer}>
                        <TouchableOpacity
                          style={
                            chipOrTatoo === "Puce"
                              ? [styles.touchable]
                              : styles.touchableNotPressed
                          }
                          onPress={() => setChipOrTatoo("Puce")}
                          activeOpacity={1}
                        >
                          <Text style={styles.touchableText}>Puce</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={
                            chipOrTatoo === "Tatouage"
                              ? [styles.touchable]
                              : styles.touchableNotPressed
                          }
                          onPress={() => setChipOrTatoo("Tatouage")}
                          activeOpacity={1}
                        >
                          <Text style={styles.touchableText}>Tatouage</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                ) : null}

                <View style={{ marginVertical: 15 }}>
                  <Line color="rgba(255,255,255,255.3)" />
                </View>

                <View style={styles.inputBlock}>
                  <Text style={styles.inputTitle}>Vacciné *</Text>
                  <View style={styles.touchableContainer}>
                    <TouchableOpacity
                      style={
                        vaccinated === false
                          ? [styles.touchable]
                          : styles.touchableNotPressed
                      }
                      onPress={() => setVaccinated(false)}
                      activeOpacity={1}
                    >
                      <Text style={styles.touchableText}>Non</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={
                        vaccinated === true
                          ? [styles.touchable]
                          : styles.touchableNotPressed
                      }
                      onPress={() => setVaccinated(true)}
                      activeOpacity={1}
                    >
                      <Text style={styles.touchableText}>Oui</Text>
                    </TouchableOpacity>
                  </View>
                </View>
  
                <View style={{ marginVertical: 15 }}>
                  <Line color="rgba(255,255,255,255.3)" />
                </View>

                <View style={styles.inputBlock}>
                  <Text style={styles.inputTitle}>Sexe *</Text>
                  <View style={styles.touchableContainer}>
                    <TouchableOpacity
                      style={
                        sex === "Femelle"
                          ? [styles.touchable]
                          : styles.touchableNotPressed
                      }
                      onPress={() => setSex("Femelle")}
                      activeOpacity={1}
                    >
                      <Text style={styles.touchableText}>Femelle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={
                        sex === "Mâle"
                          ? [styles.touchable]
                          : styles.touchableNotPressed
                      }
                      onPress={() => setSex("Mâle")}
                      activeOpacity={1}
                    >
                      <Text style={styles.touchableText}>Mâle</Text>
                    </TouchableOpacity>
                  </View>
                </View>
  
                <View style={{ marginVertical: 15 }}>
                  <Line color="rgba(255,255,255,255.3)" />
                </View>

                <View style={styles.inputBlock}>
                  <Text style={styles.inputTitle}>Race</Text>
                  {props.species === "chat" || props.species === "chien" ? (
                    <Picker
                      style={styles.picker}
                      itemStyle={styles.pickerItem}
                      selectedValue={specie}
                      onValueChange={(e) => setSpecie(e)}
                    >
                      {props.species === "chat"
                        ? raceChatArray.map((item, i) => (
                            <Picker.Item key={i} label={item} value={item} />
                          ))
                        : null}
                      {props.species === "chien"
                        ? raceChienArray.map((item, i) => (
                            <Picker.Item key={i} label={item} value={item} />
                          ))
                        : null}
                    </Picker>
                  ) : (
                    <TextInput
                      placeholder=""
                      style={
                        !priceError
                          ? styles.textInput
                          : [styles.textInput, { borderColor: "red" }]
                      }
                      autoCapitalize="none"
                      onChangeText={(e) => setSpecie(e)}
                      defaultValue=""
                    />
                  )}
                </View>

                <View style={{ marginVertical: 15 }}>
                  <Line color="rgba(255,255,255,255.3)" />
                </View>
  
                <View style={styles.inputBlock}>
                  <Text style={styles.inputTitle}>Prix *</Text>
                  <TextInput
                    placeholder="En euro, si l'animal n'est pas à vendre mettez 0"
                    style={
                      !priceError
                        ? styles.textInput
                        : [styles.textInput, { borderColor: "red" }]
                    }
                    autoCapitalize="none"
                    onFocus={() => setPriceError(false)}
                    onChangeText={(e) => setPrice(e)}
                    defaultValue={price}
                  />
                </View>

                <View style={{ marginVertical: 15 }}>
                  <Line color="rgba(255,255,255,255.3)" />
                </View>
  
                <View style={styles.inputBlock}>
                  <Text style={styles.inputTitle}>Description *</Text>
                  <TextInput
                    multiline
                    numberOfLines={5}
                    maxLength={500}
                    placeholder="Ecrivez les motivations de votre vente, ainsi que toutes les informations importantes par rapport à l'animal"
                    style={
                      !descriptionError
                        ? styles.textAreaInput
                        : [styles.textAreaInput, { borderColor: "red" }]
                    }
                    autoCapitalize="none"
                    onChangeText={(e) => setDescription(e)}
                    defaultValue={description}
                  />
                </View>
  
                <View style={{ marginVertical: 15 }}>
                  <Line color="rgba(255,255,255,255.3)" />
                </View>
  
                <View style={styles.inputBlock}>
                  <Text style={styles.inputTitle}>Département de résidence de l'animal *</Text>
                  <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    selectedValue={departement}
                    onValueChange={(e) => setDepartement(e)}
                  >
                    {departements.map((item, i) => (
                      <Picker.Item key={i} label={item} value={item} />
                    ))}
                  </Picker>
                </View>
  
                <View style={{ marginVertical: 15 }}>
                  <Line color="rgba(255,255,255,255.3)" />
                </View>
  
                <View style={styles.inputBlock}>
                  <Text style={styles.inputTitle}>Numéro de téléphone supplémentaire ?</Text>
                  <TextInput
                    placeholder=""
                    style={
                      !phoneError
                        ? styles.textInput
                        : [styles.textInput, { borderColor: "red" }]
                    }
                    autoCapitalize="none"
                    onChangeText={(e) => setPhoneNumber(e)}
                    onFocus={() => setPhoneError(false)}
                    defaultValue={phoneNumber}
                  />
                </View>
  
                <View style={{ marginVertical: 15 }}>
                  <Line color="rgba(255,255,255,255.3)" />
                </View>
  
                <View style={styles.inputBlock}>
                  <Text style={styles.inputTitle}>Photo obligatoire *</Text>
                  <MiniButton
                    name="Choisir"
                    extraStyle={styles.buttonExtraStyle}
                    onPress={() => handleChoosePhoto()}
                  />
                </View>
                {image ? (
                  <Image
                    style={styles.imagePicker}
                    source={{ uri: "data:image/png;base64," + image.data }}/>
                ) : null}
                <View style={{ marginVertical: 15 }}>
                  <Line color="rgba(255,255,255,255.3)" />
                </View>
  
                <View style={styles.block}>
                  <TouchableOpacity
                    onPress={() => sendData()}
                    style={styles.buttonCreateAvis}
                  >
                   <Text style={styles.textButton}>Créer une annonce</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.resultContainer}>
                {loading ? (
                  <LoaderSpinner />
                ) : (
                  <View style={{ justifyContent: "center" }}>
                    <Text style={styles.resultText}>
                      Votre annonce a bien été enregistré!
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
  };
};

export default connect(mapStateToProps)(AnimalFormView);

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
  backButton: {
    textAlign: "center",
    fontSize: SIZES.h2,
    color: COLORS.tertiary,
    marginTop: 10,
  },
  textButton: {
    fontSize: SIZES.h2,
    color: "white",
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
    borderTopStartRadius: SIZES.borderRadius2,
    borderTopEndRadius: SIZES.borderRadius2,
  },
  title: {
    alignSelf: "center",
    color: "black",
    borderTopEndRadius: SIZES.borderRadius2,
    fontSize: SIZES.h3,
  },
  textInput: {
    padding: 15,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "white",
  },
  textInputAge: {
    padding: 15,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "white",
    flex: 1,
    marginHorizontal: 10,
  },
  textButtonForm: {
    fontSize: SIZES.h2,
    color: "white",
  },
  textAreaInput: {
    padding: 20,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    height: 200,
    backgroundColor: "white",
  },
  inputBlock: {
    padding: 5,
    paddingHorizontal: 10,
  },
  inputBlockHorizontal: {
    padding: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  touchableContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  touchable: {
    padding: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    width: 150,
    alignItems: "center",
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "gray",
  },
  touchableNotPressed: {
    padding: 15,
    backgroundColor: COLORS.darkgray,
    borderRadius: 20,
    width: 150,
    alignItems: "center",
    borderWidth: 3,
    borderColor: COLORS.darkgray,
  },
  touchableText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  ageBlock: {
    flexDirection: "row",
  },
  inputTitle: {
    marginLeft: 10,
    marginBottom: 10,
    color: "black",
    fontSize: SIZES.h5,
  },
  picker: {
    height: 150,
    backgroundColor: "white",
    borderRadius: 30,
  },
  pickerAge: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 30,
    marginHorizontal: 15,
    flex: 1,
  },
  pickerItem: {
    height: 150,
    fontSize: 20,
  },
  pickerItemAge: {
    height: 50,
    fontSize: 20,
  },
  imagePicker: {
    marginVertical: 10,
    height: 200,
    width: 200,
    alignItems: "center",
    alignSelf: "center",
  },
  resultContainer: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  resultText: {
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 18,
    color: COLORS.darkgray,
  },
  buttonExtraStyle: {
    position: "absolute",
    left: 150,
  },
});
