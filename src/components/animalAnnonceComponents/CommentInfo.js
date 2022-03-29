import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, SIZES, icons } from "../../constants";
import SERVER from "../../../config";
import Button from "../utility/Button";

const CommentsInfo = (props) => {
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);

  const getComments = () => {
    return fetch(
      `http://${SERVER.NAME}/comments/getCommentsFromAnAnimal/${props.data.id}`,
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
        setComments(jsonData);
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 20, height: "100%" }}>
      <Button
        name="Posez une question"
        onPress={() => props.navigation.push("CommentBigScreen", {
            data: props.data,
            navigation: props.navigation,
            type: "question",
            questionOrResponse: "question",
          })
        }
      />
      {comments.length === 0 ? (
        <View style={{ height: "75%", justifyContent: "center" }}>
          <Text style={styles.noQuestion}>(Aucunes questions posté)</Text>
        </View>
      ) : null}
      {comments ? (
        <>
          {comments.map((elem, i) => (
            <>
              {!elem.answer_to ? (
                <View style={styles.questionView}>
                  <Text style={styles.username}>{elem.sender.username}</Text>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `http://${SERVER.NAME}/upload/${elem.sender.avatar}`,
                    }}
                  />
                  <Text style={styles.content}>{elem.content}</Text>
                  <Text style={styles.responseButton}>Répondre</Text>
                </View>
              ) : null}
              {elem.answers.length > 0 ? (
                <View style={styles.responseView}>
                  <Text style={styles.usernameResponse}>
                    {elem.answers[0].sender.username}
                  </Text>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `http://${SERVER.NAME}/upload/${elem.answers[0].avatar}`,
                    }}
                  />
                  <Text style={styles.content}>{elem.answers[0].content}</Text>
                </View>
              ) : null}
            </>
          ))}
        </>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  questionView: {
    marginVertical: 10,
    width: "90%",
    alignSelf: "flex-start",
    backgroundColor: COLORS.tertiary,
    padding: 10,
    borderRadius: 10,
  },
  responseView: {
    marginVertical: 10,
    width: "90%",
    alignSelf: "flex-end",
    backgroundColor: COLORS.darkgray,
    padding: 10,
    borderRadius: 10,
  },
  username: {
    color: "white",
    marginBottom: 10,
  },
  usernameResponse: {
    color: "white",
    marginBottom: 10,
  },
  content: {
    color: COLORS.lightGray3,
  },
  responseButton: {
    marginTop: 10,
    color: COLORS.secondary,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "right",
  },
  noQuestion: {
    color: COLORS.tertiary,
    fontSize: SIZES.h2,
    alignSelf: "center",
    marginTop: 15,
  }
});

export default CommentsInfo;
