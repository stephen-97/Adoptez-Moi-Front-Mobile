import React, { useEffect, useState, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  Animated,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import SERVER from "../../../config";
import MiniButton from "../utility/MiniButton";
import Line from "../utility/Line";
import LoaderSpinner from "../utility/LoaderSpinner";
import { COLORS, SIZES } from "../../constants";
import { TextInput } from "react-native-gesture-handler";
import Button from "../utility/Button";

const AnimalDeleteUserAccount = (props) => {
  const [reasonOfBan, setReasonOfBan] = useState("");
  const isVisible = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [touchable, setTouchable] = useState(false);
  const [dataResponse, setDataResponse] = useState({status: null});


  useEffect(() => {}, []);

  const animValue = useRef(new Animated.Value(-550)).current;
  const animValueOpacity = useRef(new Animated.Value(0)).current;

  const changeStoreUserAdmin = (value) => {
    const action = {
      type: "DELETE_ADMIN_USER_PROPS",
      dataUserAdminforDeleting: value,
    };
    props.dispatch(action);
  };

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: 320,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(animValueOpacity, {
      toValue: 0.6,
      duration: 400,
      useNativeDriver: false,
    }).start(() => setTouchable(true));
  }, []);

  const closeFilter = () => {
    setTouchable(false);
    Animated.timing(animValue, {
      toValue: -550,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(animValueOpacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {
      if (dataResponse.status == 200) {
        return props.navigation.navigate("SelectedUserInfoForAdmin", {
          data: props.route.params.data,
          deletedFromAdmin: true,
        });
      }
      return props.navigation.goBack(null);
    });
  };

  const deleteUserAdmin = () => {
    setIsLoading(true);
    return fetch(
      `http://${SERVER.NAME}/admin/banUser/${props.route.params.data.id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: props.AuthProps.token,
        },
      }
    )
      .then((response) => response.json())
      .then((jsonData) => {
        setDataResponse(jsonData);
        setIsLoading(false);
        if (jsonData.status == 200) {
          changeStoreUserAdmin(true);
        }
      });
  };

  return (
    <>
      <Animated.View style={[styles.deleteBlock, { bottom: animValue }]}>
        <TouchableOpacity
          style={styles.miniWindowTouchable}
          onPress={() => closeFilter()}
        >
          <Text style={{ fontSize: SIZES.h2, alignSelf: "center" }}>
            Fermer
          </Text>
        </TouchableOpacity>
        <View style={styles.content}>
          {!isLoading ? (
            <>
              {dataResponse.status ? (
                <>
                  <Text style={styles.textSucces}>{dataResponse.message}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.title}>Motif du bannissement</Text>
                  <TextInput
                    maxLength={200}
                    style={styles.textAreaInput}
                    onChange={(e) => setReasonOfBan(e)}
                  ></TextInput>
                  <Button name="Bannir" onPress={() => deleteUserAdmin()} />
                </>
              )}
            </>
          ) : (
            <LoaderSpinner />
          )}
        </View>
      </Animated.View>
      <Animated.View
        style={[styles.fullContainer, { opacity: animValueOpacity }]}
      ></Animated.View>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
    DeleteUserAdminProps: state.DeleteUserAdminReducer,
  };
};

export default connect(mapStateToProps)(AnimalDeleteUserAccount);

const styles = StyleSheet.create({
  fullContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteBlock: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "white",
    height: 250,
    width: 350,
    alignSelf: "center",
    borderRadius: SIZES.borderRadius2,
  },
  miniWindowTouchable: {
    padding: 10,
    backgroundColor: COLORS.lightGray3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    color: COLORS.tertiary,
    marginLeft: 15,
    marginTop: 15,
    fontSize: SIZES.h4,
    textAlign: "center",
  },
  textAreaInput: {
    padding: 20,
    paddingBottom: 10,
    paddingTop: 10,
    margin: 15,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    height: 60,
    backgroundColor: COLORS.lightGray3,
  },
  textSucces: {
    color: "red",
    alignSelf: "center",
    justifyContent: "center",
    fontSize: SIZES.h3,
  },
  content: {
    justifyContent: "center",
    flex: 1,
    minHeight: 150,
  },
});
