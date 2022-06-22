import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, UIManager, Platform, FlatList } from "react-native";
import { COLORS, SIZES, icons } from "../../constants";
import AnimalBlock from "../searchPageComponents/AnimalBlock";
import Line from "../utility/Line";
import SERVER from "../../../config";
import LoaderSpinner from "../utility/LoaderSpinner";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FavoritePageView = (props) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchMoreOrNot();
  }, []);

  useEffect(() => {
    sendData();
  }, [page]);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setData([]);
      sendData([]);
    });
  }, [props.navigation]);

  const sendData = () => {
    return fetch(`http://${SERVER.NAME}/favorite/getAlls/${page}/15`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: props.AuthProps.token,
      },
    })
      .then((response) => response.json())
      .then((jsonData) => {
        setData([...data, ...jsonData.items]);
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
      <FlatList
        data={data}
        style={styles.flatList}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => fetchMoreOrNot()}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => (
          <View style={{ alignItems: "center" }}>
            <AnimalBlock navigation={props.navigation} data={item} />
            <Line color="#00000050" />
          </View>
        )}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    AuthProps: state.AuthentificationReducer,
  };
};

export default connect(mapStateToProps)(FavoritePageView);

const styles = StyleSheet.create({
  backButton: {
    textAlign: "center",
    fontSize: SIZES.h2,
    color: COLORS.tertiary,
    marginTop: 10,
  },
  imageNav: {
    height: 40,
    width: 40,
  },
  flatList: {
    //alignItems: "center",
  },
  userBlock: {
    width: "100%",
    height: 100,
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
  },
});
