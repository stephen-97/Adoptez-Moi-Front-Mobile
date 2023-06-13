import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import moment from "moment";
import RadioButton from "../components/RadioButton";
import DateAndTimePicker from "../components/DateAndTimePicker";
import GooglePlacesInput from "../components/GooglePlacesInput";
import { SIZES, COLORS, GLOBALSTYLE } from "../constants";

const FormLocationAlert = () => {
  const [isCatched, setIsCatched] = useState([
    { id: 1, value: true, name: "Oui", selected: false },
    { id: 2, value: false, name: "Non", selected: false },
  ]);

  const [, setCommentText] = useState();
  const [, setEmail] = useState();
  const [, setPhoneNumber] = useState();
  const [locationDate, setLocationDate] = useState();
  const animalName = "Noisette";
  const animalType = "Chat";
  const animalGender = "Mâle";
  const lostDate = "03/02/2021";
  const lostLocation = "Paris";
  const minLocationDate = new Date(moment().subtract(1, "years"));
  const maxLocationDate = new Date(moment().add(1, "days"));
  const [, setLocationCoordinates] = useState();

  // console.log("minLocationDate", minLocationDate);

  const onRadioBtnClick = (item) => {
    const updatedState = isCatched.map((isCatchedItem) =>
      isCatchedItem.id === item.id
        ? { ...isCatchedItem, selected: true }
        : { ...isCatchedItem, selected: false }
    );
    setIsCatched(updatedState);
  };

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const data = JSON.stringify(this.commentText);
  //     this.setCommentText = '';
  //     console.log(data);
  // };

  // console.log("loc", locationCoordinates);

  return (
    <SafeAreaView keyboardShouldPersistTaps="handled">
      <ScrollView
        style={GLOBALSTYLE.scrollView}
        contentContainerStyle={GLOBALSTYLE.scrollViewContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.cardContainer}>
          <Image
            style={styles.cardImageContainer}
            source={{
              uri: "http://placekitten.com/200/300",
              height: 100,
              width: 100,
              resizeMode: "cover",
            }}
          />
          <View style={styles.cardTextContainer}>
            <Text style={GLOBALSTYLE.textBase}>{animalName}</Text>
            <Text style={GLOBALSTYLE.textBase}>{animalType}</Text>
            <Text style={GLOBALSTYLE.textBase}>{animalGender}</Text>
            <Text style={GLOBALSTYLE.textBase}>Perdu le{lostDate}</Text>
            <Text style={GLOBALSTYLE.textBase}>à{lostLocation}</Text>
          </View>
        </View>
        <View style={GLOBALSTYLE.container}>
          <Text style={GLOBALSTYLE.textMainTitle}>Vous avez vu Noisette ?</Text>
        </View>
        <View style={GLOBALSTYLE.container} keyboardShouldPersistTaps="handled">
          <Text style={GLOBALSTYLE.textTitle}>Localisation</Text>
          <View style={styles.locationContainer}>
            <Text style={[{ marginHorizontal: 10 }, GLOBALSTYLE.textBase]}>
              le
            </Text>
            <DateAndTimePicker
              mode="date"
              textStyle={GLOBALSTYLE.textInput}
              defaultDate={locationDate}
              defaultMinDate={minLocationDate}
              defaultMaxDate={maxLocationDate}
              onDateChange={(val) => {
                const newLocationDate = moment(val).format("YYYY-MM-DD");
                setLocationDate(newLocationDate);
              }}
            />
            <Text style={[{ marginHorizontal: 10 }, GLOBALSTYLE.textBase]}>
              à
            </Text>
            <DateAndTimePicker
              mode="time"
              textStyle={GLOBALSTYLE.textInput}
              defaultDate={locationDate}
              defaultMinDate={minLocationDate}
              defaultMaxDate={maxLocationDate}
              onDateChange={(val) => {
                const newTimeDate = moment(val).format("HH:mm:ss");
                const newLocationDate = `${locationDate}T${newTimeDate}`;
                setLocationDate(newLocationDate);
              }}
            />
          </View>
          <View keyboardShouldPersistTaps="handled">
            <GooglePlacesInput
              notifyChange={(loc) =>
                setLocationCoordinates({
                  latitude: loc.lat,
                  longitude: loc.lng,
                })
              }
            />
          </View>
        </View>
        <View style={GLOBALSTYLE.container}>
          <Text style={GLOBALSTYLE.textTitle}>L&apos;avez-vous attrapé ?</Text>
          <View style={styles.catchedContainer}>
            {isCatched.map((item) => (
              <RadioButton
                onPress={() => onRadioBtnClick(item)}
                selected={item.selected}
                key={item.id}
              >
                {item.name}
              </RadioButton>
            ))}
          </View>
        </View>

        <View style={GLOBALSTYLE.container}>
          <Text style={GLOBALSTYLE.textTitle}>Il est parti direction</Text>
        </View>

        <View style={GLOBALSTYLE.container}>
          <Text style={GLOBALSTYLE.textTitle}>Commentaire</Text>
          <TextInput
            style={GLOBALSTYLE.textArea}
            multiline
            numberOfLines={10}
            onChangeText={(text) => setCommentText(text)}
          />
        </View>

        <View style={GLOBALSTYLE.container}>
          <Text style={GLOBALSTYLE.textTitle}>Importer des photos</Text>
        </View>

        <View style={GLOBALSTYLE.container}>
          <Text style={GLOBALSTYLE.textTitle}>Pour vous contacter</Text>
          <TextInput
            placeholder="Email"
            style={GLOBALSTYLE.textInput}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Téléphone"
            style={GLOBALSTYLE.textInput}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>
        <View style={GLOBALSTYLE.container}>
          <Button
            title="Envoyer"
            color={COLORS.primary}
            onPress={() => console.log("Témoignage publié")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.padding * 2,
    width: "90%",
  },
  cardImageContainer: {
    borderRadius: 50,
  },
  cardTextContainer: {
    margin: 10,
    backgroundColor: COLORS.secondaryLight,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  catchedContainer: {
    padding: SIZES.padding,
  },
});

export default FormLocationAlert;
