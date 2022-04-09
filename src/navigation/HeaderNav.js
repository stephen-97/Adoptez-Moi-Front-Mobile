import React, { useState } from "react";
import { connect } from "react-redux";
import { Header, Body, Title } from "native-base";
import { Image, View, StyleSheet, TouchableHighlight } from "react-native";
import { COLORS } from "../constants/theme";
import icons from "../constants/icons";
import { tokenDecode } from "../components/utility/functions";
import SliderAccountLogo from "../components/authentificationComponents/SliderAccountLogo";

const imageContainerHeight = 40;

const HeaderNav = (props) => {
  const sideMenu = props.NavProps;
  const sideMenuAccount = props.NavAccount;

  const [toggled, setToggled] = useState(false);

  const userHaveNewMessages = () => {
    if (props.AuthProps.token) {
      if (tokenDecode(props.AuthProps.token).newMessages) return true;
    }
    return false;
  };

  return (
    <>
      <Header style={styles.navBarHeader}>
        <Body style={styles.body}>
          {props.AuthProps.token ? (
            <>
              <TouchableHighlight
                style={[
                  styles.imageContainerAccount,
                  toggled ? { backgroundColor: COLORS.lightGray3 } : null,
                ]}
                onPress={() => {
                  setToggled(!toggled);
                }}
              >
                <Image style={styles.imageNav} source={icons.accountLogo} />
              </TouchableHighlight>
            </>
          ) : null}

          <TouchableHighlight
            style={styles.imageContainerNav}
            onPress={() => sideMenu.toggleDrawer()}
          >
            <>
              <Image style={styles.imageNav} source={icons.mobileNavIcon} />
              {userHaveNewMessages() ? <View style={styles.redPoint}></View> : null}
            </>
          </TouchableHighlight>
          <Title style={styles.title}>{props.name}</Title>
        </Body>
      </Header>
      {toggled ? (
        <SliderAccountLogo
          style={styles.sliderAccount}
          navigation={props.NavProps}
          toggled={setToggled}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    NavProps: state.SendNavPropsReducer,
    AuthProps: state.AuthentificationReducer,
    NavAccount: state.SendNavAccountPropsReducer,
  };
};

export default connect(mapStateToProps)(HeaderNav);

const styles = StyleSheet.create({
  navBarHeader: {
    backgroundColor: COLORS.secondary,
    flexDirection: "row",
  },
  body: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    alignSelf: "center",
  },
  imageContainerNav: {
    height: 40,
    width: 40,
    position: "absolute",
    right: "5%",
  },
  imageContainerAccount: {
    height: imageContainerHeight,
    width: 40,
    position: "absolute",
    left: 50,
  },
  imageNav: {
    maxHeight: "100%",
    maxWidth: "100%",
    zIndex: 1,
  },
  sliderAccount: {
    position: "absolute",
    left: "10%",
    width: 160,
    top: 112,
    backgroundColor: COLORS.lightGray3,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    zIndex: 1,
    transform: [{ translateX: "-40" }],
  },
  redPoint: {
    width: 12,
    height: 12,
    position: "absolute",
    backgroundColor: "red",
    zIndex: 1,
    borderRadius: 50,
    top: -3,
    right: -3,
  },
});
