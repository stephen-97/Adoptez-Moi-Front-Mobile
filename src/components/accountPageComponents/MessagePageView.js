import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  UIManager,
  Platform,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, icons } from "../../constants";
import { refreshToken } from "../utility/functions";
import Line from "../utility/Line";
import SERVER from "../../../config";
import { convertDate } from "../utility/functions";
import LoaderSpinner from "../utility/LoaderSpinner";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MessagePageView = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (checkIfAllCommentsAreViewed()) {
      sendUserViewedTheMessages();
    }
    sendUserViewedTheMessages();
  }, [data]);

  const getData = () => {
    return fetch(`http://${SERVER.NAME}/comments/getNotViewedQuestion`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: props.AuthProps.token,
      },
    })
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      });
  };

  const sendUserViewedTheMessages = () => {
    return fetch(`http://${SERVER.NAME}/comments/userViewedTheMessages`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: props.AuthProps.token,
      },
    })
      .then((response) => response.json())
      .then((jsonData) => {
        if (jsonData.status === "200") {
          refreshToken(props);
        }
      });
  };

  const test = (elem) => {
    if (elem.answers.length === 0 && elem.answer_to) return "alreadyAnswered";
    if (elem.answers.length > 0) return "alreadyAnswered";
    if (elem.answers.length === 0 && elem.answer_to === undefined)
      return "answer";
    if (elem.answer_to) return "alreadyAnswered";
    return "answer";
  };

  const messageBlockStyle = (elem) => {
    if (elem.answers.length === 0 && elem.answer_to)
      return styles.contentAnswered;
    if (elem.answers.length > 0) return styles.contentAnswered;
    if (elem.answers.length === 0 && elem.answer_to === undefined)
      return styles.content;
    if (elem.answer_to) return styles.contentAnswered;
    return styles.content;
  };

  const checkIfAllCommentsAreViewed = () => {
    for (let i = 0; i < data.length; i++) {
      if (!data[i].is_read) return true;
    }
    return false;
  };

  return (
    <ScrollView>
      {data.map((elem, i) => (
        <TouchableOpacity
          key={i}
          onPress={() =>
            props.navigation.push("CommentBigScreen", {
              data: elem,
              navigation: props.navigation,
              type: test(elem),
              questionOrResponse: "response",
            })
          }
          activeOpacity={1}
          style={messageBlockStyle(elem)}
        >
          <View style={styles.animalNameAndImageContent}>
            <Text style={styles.animalName}>{elem.animal.name}</Text>
            <Image
              style={styles.image}
              source={{
                uri: `http://${SERVER.NAME}/upload/${elem.animal.images[0].name}`,
              }}
            />
          </View>
          <View style={styles.lineContainer}>
            <Line color="#FFFFFF60" />
          </View>
          <View style={styles.userNameAndImageContent}>
            <Text style={styles.userName}>{elem.sender.username}</Text>
            {elem.sender.avatar ? (
              <Image
                style={styles.imageUser}
                source={{
                  uri: `http://${SERVER.NAME}/upload/${elem.sender.avatar}`,
                }}
              />
            ) : (
              <Image style={styles.imageUser} source={icons.accountLogo} />
            )}
          </View>
          <Text style={styles.textContent}>{elem.content}</Text>
          <Text style={styles.date}>{convertDate(elem.created_at)}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
  };
};

export default connect(mapStateToProps)(MessagePageView);

const styles = StyleSheet.create({
  content: {
    margin: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  contentAnswered: {
    margin: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.darkgray,
    borderRadius: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  imageUser: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  animalNameAndImageContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  userNameAndImageContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  animalName: {
    fontSize: SIZES.h2,
    color: "white",
    marginRight: 15,
    fontWeight: "bold",
  },
  userName: {
    fontSize: SIZES.h4,
    color: "white",
    marginRight: 15,
  },
  textContent: {
    color: "white",
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  date: {
    color: "black",
    paddingHorizontal: 15,
  },
  lineContainer: {
    marginVertical: 15,
  },
  questionOrResponse: {
    position: "absolute",
    top: 5,
    right: 15,
    color: COLORS.darkgray,
    fontSize: 22,
  },
});
