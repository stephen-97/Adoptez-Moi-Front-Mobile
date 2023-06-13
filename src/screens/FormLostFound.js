import React from "react";
import { View, Text, Button, ScrollView, SafeAreaView } from "react-native";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import moment from "moment";
import FormikTextInput from "../components/formikComponents/FormikTextInput";
import MediaPicker from "../components/MediaPicker";
import { COLORS, GLOBALSTYLE } from "../constants";
import FormikPicker from "../components/formikComponents/FormikPicker";
import FormikDateAndTimePicker from "../components/formikComponents/FormikDateAndTimePicker";
import FormikGooglePlacesInput from "../components/formikComponents/FormikGooglePlacesInput";

const FormLostFound = () => {
  // Data
  const initialValues = {
    commentText: "",
    email: "",
    phoneNumber: "",
    lostOrFound: "lost",
    lostFoundDate: moment().format("YYYY-MM-DD"),
    lostFoundTime: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
    lostFoundCoordinates: null,
    animalName: "",
    animalAge: 0,
    animalSpecies: "dog",
    animalSex: "female",
    animalRace: "",
    exoticPetType: "",
  };

  const validationSchema = Yup.object({
    commentText: Yup.string()
      .min(5, "5 caractères minimum")
      .max(500, "500 caractères maximum"),
    email: Yup.string()
      .email("Veuillez saisir une adresse email valide")
      .required("Champ obligatoire"),
    phoneNumber: Yup.string()
      .matches(
        "0[1-9][0-9]{8}",
        "Veuillez saisir un numéro de téléphone à 10 chiffres"
      )
      .min(10, "Veuillez saisir un numéro de téléphone à 10 chiffres")
      .max(10, "Veuillez saisir un numéro de téléphone à 10 chiffres"),
    lostOrFound: Yup.string().required("Champ obligatoire"),
    lostFoundDate: Yup.string().required("Champ obligatoire"),
    lostFoundTime: Yup.string().required("Champ obligatoire"),
    lostFoundCoordinates: Yup.mixed().required("Champ obligatoire"),
    animalName: Yup.string()
      .min(2, "2 caractères minimum")
      .max(30, "30 caractères maximum"),
    animalAge: Yup.number().required("Champ obligatoire"),
    animalSpecies: Yup.string().required("Champ obligatoire"),
    animalSex: Yup.string().required("Champ obligatoire"),
    animalRace: Yup.string(),
    exoticPetType: Yup.string(),
  });

  const lostOrFoundSelect = [
    { label: "Perdu", value: "lost" },
    { label: "Trouvé", value: "found" },
  ];

  const animalSpeciesSelect = [
    { label: "Chien", value: "dog" },
    { label: "Chat", value: "cat" },
    { label: "NAC", value: "exoticPet" },
  ];

  const animalSexSelect = [
    { label: "Femelle", value: "female" },
    { label: "Male", value: "male" },
    { label: "Inconnu", value: "unknown" },
  ];

  const animalAgeSelect = [
    { label: "Age inconnu", value: 0 },
    { label: "< 6mois", value: 6 },
    { label: "< 1an", value: 12 },
    { label: "entre 1 et 5 ans", value: 60 },
    { label: "entre 5 et 15 ans", value: 180 },
    { label: "plus de 15 ans", value: 240 },
  ];

  const minLostFoundDate = new Date(moment().subtract(1, "years"));
  const maxLostFoundDate = new Date(moment().add(1, "days"));

  // Methods
  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  const formatLostFoundDay = (val) => {
    return moment(val).format("YYYY-MM-DD");
  };

  const formatLostFoundTime = (val, lostFoundDay) => {
    const newTimeDate = moment(val).format("HH:mm:ss");
    return `${lostFoundDay}T${newTimeDate}`;
  };

  return (
    <Formik
      initialValues={initialValues}
      // validate={(values) => {}}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleSubmit, errors, touched, isValid }) => (
        <SafeAreaView>
          <ScrollView
            style={GLOBALSTYLE.scrollView}
            contentContainerStyle={GLOBALSTYLE.scrollViewContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={GLOBALSTYLE.container}>
              <Text style={GLOBALSTYLE.textMainTitle}>
                Vous avez perdu ou trouvé un animal ?
              </Text>
              <Field
                component={FormikPicker}
                name="lostOrFound"
                selectOptions={lostOrFoundSelect}
                style={GLOBALSTYLE.selectInput}
              />
            </View>
            <View
              style={GLOBALSTYLE.container}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={GLOBALSTYLE.textTitle}>Localisation</Text>
              <Text
                style={[
                  GLOBALSTYLE.textBase,
                  { paddingTop: 10, paddingLeft: 5 },
                ]}
              >
                Date
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Field
                  component={FormikDateAndTimePicker}
                  name="lostFoundDate"
                  onSetField={(val) => formatLostFoundDay(val)}
                  defaultDate={new Date(moment())}
                  style={GLOBALSTYLE.textInput}
                  defaultMinDate={minLostFoundDate}
                  defaultMaxDate={maxLostFoundDate}
                  mode="date"
                />
                <Field
                  component={FormikDateAndTimePicker}
                  name="lostFoundTime"
                  onSetField={(val) =>
                    formatLostFoundTime(val, values.lostFoundDate)
                  }
                  defaultDate={new Date(moment())}
                  style={GLOBALSTYLE.textInput}
                  defaultMinDate={minLostFoundDate}
                  defaultMaxDate={maxLostFoundDate}
                  mode="time"
                />
              </View>
              <Text
                style={[
                  GLOBALSTYLE.textBase,
                  { paddingTop: 10, paddingLeft: 5 },
                ]}
              >
                Lieu
              </Text>
              <View keyboardShouldPersistTaps="handled">
                <Field
                  component={FormikGooglePlacesInput}
                  name="lostFoundCoordinates"
                  style={GLOBALSTYLE.textInput}
                ></Field>
              </View>
            </View>

            <View style={GLOBALSTYLE.container}>
              <Text style={GLOBALSTYLE.textTitle}>Il est parti direction</Text>
            </View>

            <View style={GLOBALSTYLE.container}>
              <Text style={GLOBALSTYLE.textTitle}>Description</Text>
              <Field
                component={FormikTextInput}
                name="animalName"
                placeholder="Nom de l'animal"
                style={GLOBALSTYLE.textInput}
                multiline={false}
                placeholderTextColor={COLORS.black}
              />
              <Field
                component={FormikPicker}
                name="animalSpecies"
                selectOptions={animalSpeciesSelect}
                style={GLOBALSTYLE.selectInput}
              />
              <Field
                component={FormikTextInput}
                name="exoticPetType"
                placeholder="Type de NAC"
                style={GLOBALSTYLE.textInput}
                multiline={false}
                placeholderTextColor={COLORS.black}
              />
              <Field
                component={FormikTextInput}
                name="animalRace"
                placeholder="Race"
                style={GLOBALSTYLE.textInput}
                multiline={false}
                placeholderTextColor={COLORS.black}
              />
              <Field
                component={FormikPicker}
                name="animalSex"
                selectOptions={animalSexSelect}
                style={GLOBALSTYLE.selectInput}
              />
              <Field
                component={FormikPicker}
                name="animalAge"
                selectOptions={animalAgeSelect}
                style={GLOBALSTYLE.selectInput}
              />
            </View>

            <View style={GLOBALSTYLE.container}>
              <Text style={GLOBALSTYLE.textTitle}>Commentaire</Text>
              <Field
                component={FormikTextInput}
                name="commentText"
                style={GLOBALSTYLE.textArea}
                multiline
              />
            </View>

            <View style={GLOBALSTYLE.container}>
              <Text style={GLOBALSTYLE.textTitle}>Importer des photos</Text>
              <MediaPicker />
            </View>

            <View style={GLOBALSTYLE.container}>
              <Text style={GLOBALSTYLE.textTitle}>Pour vous contacter</Text>
              <Field
                component={FormikTextInput}
                name="email"
                placeholder="Email"
                style={GLOBALSTYLE.textInput}
                multiline={false}
                placeholderTextColor={COLORS.black}
              />
              <Field
                component={FormikTextInput}
                name="phoneNumber"
                placeholder="Téléphone"
                style={GLOBALSTYLE.textInput}
                multiline={false}
                placeholderTextColor={COLORS.black}
              />
            </View>
            <View style={GLOBALSTYLE.container}>
              <Button
                title="Envoyer"
                color={COLORS.primary}
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default FormLostFound;
