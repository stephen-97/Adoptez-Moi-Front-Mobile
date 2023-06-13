import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  // base colors
  primary: "#272343", // violet
  secondary: "#bae8e8", // cyan
  secondaryLight: "#e3f6f5", // cyan clair
  tertiary: "#036f94", //#5562ed"

  // colors
  black: "#1E1F20",
  white: "#FFFFFF",

  lightprimary: "#363159",
  lightGray: "#F5F5F6",
  lightGray2: "#F6F6F7",
  lightGray3: "#EFEFF1",
  lightGray4: "#F8F8F9",
  transparent: "transparent",
  darkgray: "#898C95",

  incorrect: "#fc4848",
  correct: "#3fc225",
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 15,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,

  // radius
  bordeRadius: 5,
  borderRadius2: 10,
  BorderRadiusNoStraightLine: 30,
};

export const GLOBALSTYLE = StyleSheet.create({
  scrollView: {
    height: "100%",
    width: "90%",
    alignSelf: "center",
    margin: 20,
    padding: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondaryLight,
  },
  container: {
    padding: 20,
    width: "90%",
    backgroundColor: COLORS.white,
  },
  textArea: {
    margin: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondaryLight,
    textAlignVertical: "top",
    height: 100,
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondaryLight,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  textMainTitle: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: SIZES.h2,
  },
  textTitle: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: SIZES.h4,
    marginBottom: 5,
  },
  textBase: {
    color: COLORS.primary,
    fontSize: SIZES.body3,
  },
});

const appTheme = { COLORS, SIZES, GLOBALSTYLE };

export default appTheme;
