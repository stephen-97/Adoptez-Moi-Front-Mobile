import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { COLORS, SIZES, icons } from "../../constants";
import SERVER from "../../../config";
import { convertDate } from "../utility/functions";
import LoaderSpinner from "../utility/LoaderSpinner";

const AdminPageView = (props) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchUsername, setSearchUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const changeStoreUserAdmin = (value) => {
    const action = {
      type: "DELETE_ADMIN_USER_PROPS",
      dataUserAdminforDeleting: value,
    };
    props.dispatch(action);
  };

  useEffect(() => {
    if (props.DeleteUserAdminProps) changeStoreUserAdmin(false);
    setPage(1);
    if (page === 1 || props.DeleteUserAdminProps) getAllUserFromApi2();
  }, [searchUsername, props.DeleteUserAdminProps === true]);

  useEffect(() => {
    if (page !== 1) getAllUserFromApi();
  }, [page]);

  useEffect(() => {
    if (page === 1) getAllUserFromApi2();
  }, [page]);

  const getAllUserFromApi = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("page", page);
    formData.append("nbItemsOfPage", 10);
    formData.append("username", searchUsername);
    return fetch(`http://${SERVER.NAME}/admin/allUsers`, {
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
        setData([...data, ...jsonData.items]);
        setTotalCount(jsonData.total_count);
      });
  };

  const getAllUserFromApi2 = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("page", page);
    formData.append("nbItemsOfPage", 10);
    formData.append("username", searchUsername);
    return fetch(`http://${SERVER.NAME}/admin/allUsers`, {
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
        setData(jsonData.items);
        setTotalCount(jsonData.total_count);
      });
  };

  const fetchMoreOrNot = () => {
    let newValue = totalCount / 10;
    if (Math.round(newValue) < newValue) {
      newValue = Math.round(newValue) + 1;
    } else {
      newValue = Math.round(newValue);
    }
    if (page < newValue) {
      setPage(page + 1);
    }
  };
  return (
    <>
      <View style={styles.searchSpace}>
        <Text style={styles.inputTitle}>Recherche</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Recherche d'utilisateur"
          autoCapitalize="none"
          onChangeText={(e) => setSearchUsername(e)}
          onFocus={() => null}
        />
      </View>
      <>
        <FlatList
          data={data}
          style={styles.flatList}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => fetchMoreOrNot()}
          onEndReachedThreshold={0.1}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.userBlock}
              onPress={() =>
                props.navigation.navigate("SelectedUserInfoForAdmin", {
                  data: item,
                })
              }
            >
              <Image style={styles.imageNav} source={icons.accountLogo} />
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.createdDate}>
                {convertDate(item.created_at)}
              </Text>
            </TouchableOpacity>
          )}
        />
        {loading ? <LoaderSpinner /> : null}
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
    DeleteAnimalProps: state.DeleteAnimalReducer,
    DeleteUserAdminProps: state.DeleteUserAdminReducer,
  };
};

export default connect(mapStateToProps)(AdminPageView);

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "white",
  },
  inputTitle: {
    marginLeft: 10,
    marginVertical: 10,
    color: "black",
    fontSize: SIZES.h5,
  },
  searchSpace: {
    backgroundColor: COLORS.darkgray,
    padding: 10,
  },
  userBlock: {
    height: 100,
    backgroundColor: "#cfcfcf",
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: SIZES.borderRadius2,
    padding: 10,
  },
  imageNav: {
    height: 40,
    width: 40,
    position: "absolute",
    top: 50,
    transform: [{ translateY: -20 }],
    left: 30,
  },
  username: {
    fontSize: 18,
    position: "absolute",
    height: 20,
    right: 200,
    top: 50,
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
  createdDate: {
    position: "absolute",
    fontSize: 18,
    height: 20,
    right: 30,
    top: 50,
    transform: [{ translateY: -10 }],
  },
});
