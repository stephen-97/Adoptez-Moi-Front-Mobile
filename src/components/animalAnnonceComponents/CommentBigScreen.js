import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { COLORS, icons, SIZES } from "../../constants";
import SERVER from "../../../config";
import CloseModal from "../utility/CloseModalButton";
import Button from "../utility/Button";
import LoaderSpinner from "../utility/LoaderSpinner";


const { width, height } = Dimensions.get("window");

const AnimalBigScreen = (props) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestSended, setRequestSended] = useState(false);

  const sendAnswer = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("animalId", props.route.params.data.animal.id);
    formData.append("commentWhoIsAnsweredId", props.route.params.data.id);
    formData.append("userWhoIsAnsweredId", props.route.params.data.sender.id);
    formData.append("content", content);
    return fetch(`http://${SERVER.NAME}/comments/response`, {
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
        setLoading(false);
        if (jsonData.status === 200) setRequestSended(true);
      });
  };

  const sendQuestion = () => {
    const formData = new FormData();
    formData.append("animalId", props.route.params.data.id);
    formData.append("animalIsUserid", props.route.params.data._user.id);
    formData.append("content", content);
    return fetch(`http://${SERVER.NAME}/comments/question`, {
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
        setLoading(false);
        if (jsonData.status === 200) setRequestSended(true);
      });
  };

  const questionOrResponse = () => {
    if (props.route.params.questionOrResponse === "question") sendQuestion();
    if (props.route.params.questionOrResponse === "response") sendAnswer();
  };

  return (
    <View style={styles.container}>
      <CloseModal navigation={() => props.navigation.goBack(null)} />
      {requestSended ? (
        <Text style={styles.title}>Formulaire soumis!</Text>
      ) : (
        <ScrollView>
          {props.route.params.type === "question" ? (
            <Text style={styles.title}>
              Posez votre question au propriétaire de {props.route.params.data.name}
            </Text>
          ) : null}
          {props.route.params.type === "answer" ? (
            <>
              <Text style={styles.title}>
                Répondre à la question de
                {props.route.params.data.sender.username} :
              </Text>
              <Text style={[styles.title, { marginTop: 20 }]}>
                "{props.route.params.data.content}"
              </Text>
            </>
          ) : null}
          {props.route.params.type === "alreadyAnswered" ? (
            <>
              {props.route.params.data.answer_to ? (
                <>
                  <Text style={styles.title}>
                    le propriétaire {props.route.params.data.sender.username} a
                    répondu à votre question
                  </Text>
                  <Text style={styles.subTitle}>Question</Text>
                  <View style={styles.questionContainer}>
                    <Text style={styles.question}>
                      {props.route.params.data.answer_to.content}
                    </Text>
                  </View>
                  <Text style={styles.subTitle}>Réponse</Text>
                  <View style={styles.responseContainer}>
                    <Text style={styles.responseToAnswer}>
                      {props.route.params.data.content}
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <Text style={styles.title}>
                    Question de {props.route.params.data.sender.username} déjà
                    répondu :
                  </Text>
                  <Text style={styles.subTitle}>Question</Text>
                  <View style={styles.questionContainer}>
                    <Text style={styles.question}>
                      {props.route.params.data.content}
                    </Text>
                  </View>
                  <Text style={styles.subTitle}>Votre réponse</Text>
                  <View style={styles.responseContainer}>
                    <Text style={styles.responseToAnswer}>
                      {props.route.params.data.answers.length > 0 ? props.route.params.data.answers[0].content : null}
                    </Text>
                  </View>
                </>
              )}
            </>
          ) : null}
          {loading ? (
            <LoaderSpinner />
          ) : (
            <View>
              {props.route.params.type !== "alreadyAnswered" ? (
                <>
                  <TextInput
                    style={styles.textInput}
                    multiline
                    numberOfLines={6}
                    showSoftInputOnFocus={false}
                    onChangeText={(e) => setContent(e)}
                  />
                  <View style={{ marginTop: 40 }}>
                    <Button
                      name="Soumettre"
                      onPress={() => questionOrResponse()}
                    />
                  </View>
                </>
              ) : null}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.secondaryLight,
    borderRadius: 50,
  },
  textInput: {
    width: "90%",
    height: 250,
    backgroundColor: "white",
    alignSelf: "center",
    borderColor: COLORS.tertiary,
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    paddingVertical: 20,
    marginTop: 80,
  },
  title: {
    alignSelf: "center",
    marginHorizontal: 20,
    textAlign: "center",
    borderColor: COLORS.tertiary,
    fontSize: SIZES.h2,
    marginTop: 120,
    color: COLORS.tertiary,
  },
  questionContainer: {
    borderRadius: 10,
    alignSelf: "center",
    fontSize: SIZES.h2,
    backgroundColor: COLORS.tertiary,
    padding: 10,
    overflow: "hidden",
    width: "90%",
  },
  question: {
    color: "white",
    fontSize: SIZES.h3,
  },
  responseContainer: {
    borderRadius: 10,
    alignSelf: "center",
    fontSize: SIZES.h2,
    backgroundColor: COLORS.darkgray,
    padding: 10,
    overflow: "hidden",
    width: "90%",
  },
  responseToAnswer: {
    color: "white",
    fontSize: SIZES.h3,
  },
  subTitle: {
    marginTop: 30,
    padding: 10,
    fontSize: SIZES.h3,
    marginLeft: 10,
  }
});

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
    DeleteAnimalProps: state.DeleteAnimalReducer,
  };
};

export default connect(mapStateToProps)(AnimalBigScreen);
