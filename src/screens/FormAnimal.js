import React, { useState, useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import { Container, Content, Right } from "native-base";
import HeaderBasic from "../navigation/HeaderBasic";
import AnimalFormView from "../components/accountPageComponents/AnimalFormView";
import AnimalSelectForm from "../components/accountPageComponents/AnimalSelectForm";
import { relativeTimeRounding } from "moment";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const FormAnimal = (props) => {
  const [isFormSelected, setFormIsSelected] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const prevCount = usePrevious(isFormSelected);

  const dataColor = {
    chien: "#9193d4",
    chat: "#dbb69d",
    volatile: "#77cdca",
    reptile: "#77d199",
    autres: "#e7ab61",
  };

  const [isFormSelected2, setFormIsSelected2] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  useEffect(() => {
    if (!prevCount && isFormSelected) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start(() => {
        setFormIsSelected2(true);
        Animated.timing(fadeAnim2, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }).start();
      });
    }
    if (prevCount && !isFormSelected) {
      Animated.timing(fadeAnim2, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start(() => {
        setFormIsSelected2(false);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }).start();
      });
    }
  }, [isFormSelected]);

  return (
    <Container style={{ borderRadius: 50 }}>
      <HeaderBasic name="Formulaire" navigation={props.navigation} />
      <Content contentContainerStyle={{ flex: 1 }}>
        {!isFormSelected2 ? (
          <Animated.View
            style={[styles.selectFormContainer, { opacity: fadeAnim }]}
          >
            <AnimalSelectForm
              navigation={props.navigation}
              onChangeForm={setFormIsSelected}
              onChangeSpecies={setSelectedSpecies}
            />
          </Animated.View>
        ) : (
          <Animated.View
            style={[styles.selectFormContainer, { opacity: fadeAnim2 }]}
          >
            <AnimalFormView
              navigation={props.navigation}
              onChangeForm={setFormIsSelected}
              species={selectedSpecies}
              color={dataColor[selectedSpecies]}
            />
          </Animated.View>
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  selectFormContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});

export default FormAnimal;

//<AnimalFormView navigation={navigation} />