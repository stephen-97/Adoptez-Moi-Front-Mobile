import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import SERVER from "../../../config";
import Animal from "./Animal";
import Line from "../utility/Line";
import Button from "../utility/Button";
import { COLORS, SIZES, icons } from "../../constants";
import InputRange from "../utility/InputRange";

const AnimalList2 = (props) => {

  const [data, setData] = useState({ items: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPorPage = 10;
  const scrollRef = useRef();
  const [lastPage, setLastPage] = useState(1);

  const getData = () => {
    const formData = new FormData();
    formData.append("nbitemsPorPage", itemsPorPage);
    formData.append("currentPage", currentPage);
    formData.append("specie", props.FilterData.espece);
    formData.append("sex", props.FilterData.sexe);
    formData.append("price", props.FilterData.price);
    formData.append("departmen", props.FilterData.department);
    return fetch(`http://${SERVER.NAME}/wanted/page/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setLastPage(
          Math.floor(jsonData.total_count / jsonData.num_items_per_page + 1)
        );
      });
  };

  const isVisible = useIsFocused();
  useEffect(() => {
    getData();
    scrollRef.current?.scrollTo({
      y: 0,
      animated: false,
    });
  }, [currentPage, props.FilterData, isVisible]);

  const styleColorPrev = () => {
    if (currentPage === 1) {
      return "gray";
    }
    return COLORS.primary;
  };

  const styleColorNext = () => {
    if (currentPage === lastPage) {
      return "gray";
    }
    return COLORS.primary;
  };

  const onPressPrev = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const onPressNext = () => {
    if (currentPage !== lastPage) setCurrentPage(currentPage + 1);
  };

  const onPressToFirstPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const onPressToLastPage = () => {
    if (currentPage !== lastPage) {
      setCurrentPage(lastPage);
    }
  };

  const ArrowButtonLeft = (props) => {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.buttonArrow, props.extraStyle, props.rotate]}
      >
        <Image style={[styles.imageArrow]} source={icons.arrowWhite} />
      </TouchableOpacity>
    );
  };

  const ArrowButtonRight = (props) => {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.buttonArrow, props.extraStyle, props.rotate]}
      >
        <Image style={styles.imageArrow} source={icons.arrowWhite} />
      </TouchableOpacity>
    );
  };

  const ArrowButtonExtremeLeft = (props) => {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.buttonArrow, props.extraStyle, props.rotate]}
      >
        <Image style={[styles.imageArrow]} source={icons.arrowDoubleWhite} />
      </TouchableOpacity>
    );
  };

  const ArrowButtonExtremeRight = (props) => {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.buttonArrow, props.extraStyle, props.rotate]}
      >
        <Image style={styles.imageArrow} source={icons.arrowDoubleWhite} />
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView ref={scrollRef} style={styles.container}>
      <View style={styles.pageList}>
        <Text>{data.total_count} annonces trouvées</Text>
        {data.items.map((elem, i) => (
          <>
            <Animal
              key={i.toString()}
              navigation={props.navigation}
              data={elem}
            />
            <Line key={`${i.toString()}Line`} color="#00000050" />
          </>
        ))}
      </View>

      <View style={styles.button_container}>
        <ArrowButtonExtremeLeft
          onPress={() => onPressToFirstPage()}
          extraStyle={{ left: "5%", backgroundColor: styleColorPrev() }}
          rotate={{
            transform: [{ translateY: -30 }, { rotate: "90deg" }],
          }}
        />
        <ArrowButtonLeft
          onPress={() => onPressPrev()}
          extraStyle={{ left: "25%", backgroundColor: styleColorPrev() }}
          rotate={{
            transform: [{ translateY: -30 }, { rotate: "90deg" }],
          }}
        />
        <View style={styles.pageButtonContainer}>
          <Text style={styles.pageNumberButtonContainer}>
            {currentPage}/{lastPage}
          </Text>
        </View>
        <ArrowButtonRight
          onPress={() => onPressNext()}
          extraStyle={{ right: "25%", backgroundColor: styleColorNext() }}
          rotate={{
            transform: [{ translateY: -30 }, { rotate: "-90deg" }],
          }}
        />
        <ArrowButtonExtremeRight
          onPress={() => onPressToLastPage()}
          extraStyle={{ right: "5%", backgroundColor: styleColorNext() }}
          rotate={{
            transform: [{ translateY: -30 }, { rotate: "-90deg" }],
          }}
        />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    FilterData: state.FilterReducer,
  };
};

/**
 * <TouchableOpacity
          onPress={() => onPressPrev()}
          style={
            stylePressPrev()
              ? styles.Button_prev
              : styles.Button_prev_untouchable
          }
        >
          <Text style={styles.button_text}>Précédent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPressNext()}
          style={
            stylePressNext()
              ? styles.Button_next
              : styles.Button_next_untouchable
          }
        >
          <Text style={styles.button_text}>Suivant</Text>
        </TouchableOpacity>
 */
/**
 * <ScrollView
        ref={ref => this.containerRef = ref}
        style={styles.container}
      >
        <View style={styles.pageList}>
          <Text>{this.state.newDataAfterFilter} avis trouvés</Text>
          {this.fetchProduct().map((elem, index) =>
            this.renderItem(index, this.fetchProduct())
          )}
        </View>

        <View style={styles.button_container}>
          <TouchableOpacity
            onPress={this.onPressPrevious}
            style={
              this.CanPressPrev()
                ? styles.Button_prev
                : styles.Button_prev_untouchable
            }
          >
            <Text style={styles.button_text}>Précédent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onPressNext}
            style={
              this.CanPressNext()
                ? styles.Button_next
                : styles.Button_next_untouchable
            }
          >
            <Text style={styles.button_text}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>




      <React.Fragment key={key}>
        <Animal
          navigation={this.props.navigation}
          image={images.dog1}
          data={AnimalData[key]}
        ></Animal>
        <View
          style={{
            borderWidth: 0.5,
            width: "100%",
            borderColor: "#00000050",
          }}
        ></View>
      </React.Fragment>
 */

export default connect(mapStateToProps)(AnimalList2);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 70,
    marginBottom: 50,
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    overflow: "scroll",
  },
  pageList: {
    alignItems: "center",
  },
  buttonArrow: {
    height: 60,
    width: 60,
    borderRadius: 5,
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -30 }],
  },
  button_container: {
    marginTop: "5%",
    marginBottom: 30,
    height: 80,
  },
  Button_prev: {
    borderWidth: 1,
    borderColor: "#00000050",
    backgroundColor: "#a1dfe4",
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 60,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
    },
    shadowOpacity: 0.2,
  },
  Button_prev_untouchable: {
    backgroundColor: "#b0b8b4A0",
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 60,
  },
  Button_next: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: SIZES.padding2,
    backgroundColor: COLORS.tertiary,
    borderRadius: 5,
  },
  Button_next_untouchable: {
    backgroundColor: "#b0b8b4A0",
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 60,
    right: 0,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
    },
    shadowOpacity: 0.2,
  },
  button_text: {
    fontSize: 20,
  },
  imageArrow: {
    height: 40,
    width: 40,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateY: -20 }, { translateX: -20 }],
  },
  pageButtonContainer: {
    justifyContent: "center",
    height: 40,
    width: 50,
    alignItems: "center",
    top: "50%",
    left: "50%",
    transform: [{ translateY: -20 }, { translateX: -25 }],
  },
  pageNumberButtonContainer: {
    textAlign: "center",
    color: COLORS.tertiary,
    fontSize: SIZES.h1,
  },
});
