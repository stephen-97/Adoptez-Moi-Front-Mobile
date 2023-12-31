import { createStore, combineReducers } from "redux";

const initialState = [
  {
    race: "chien",
    sexe: "male",
  },
];

const initialState2 = {
  espece: "",
  sexe: "",
  departement: "",
};

const initialStateAuth = {
  code: false,
};

function FavoriteReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_VALUE":
      return [action.the_data];
    default:
      return state;
  }
}

function FilterReducer(state = initialState2, action) {
  switch (action.type) {
    case "NEW_FILTER_DATA":
      return action.dataFilter;
    default:
      return state;
  }
}

function SendNavPropsReducer(state = null, action) {
  switch (action.type) {
    case "NAV_PROPS":
      return action.navigationProps;
    default:
      return state;
  }
}

function SendNavAccountPropsReducer(state = null, action) {
  switch (action.type) {
    case "NAV_ACCOUNT_PROPS":
      return action.navigationProps;
    default:
      return state;
  }
}

function AuthentificationReducer(state = initialStateAuth, action) {
  switch (action.type) {
    case "AUTH_PROPS":
      return action.authentificationProps;
    default:
      return state;
  }
}

function DeleteAnimalReducer(state = {}, action) {
  switch (action.type) {
    case "DELETE_ANIMAL_PROPS":
      return action.dataAnimalforDeleting;
    default:
      return state;
  }
}
const combinedStore = combineReducers({
  SendNavPropsReducer,
  FavoriteReducer,
  FilterReducer,
  AuthentificationReducer,
  SendNavAccountPropsReducer,
  DeleteAnimalReducer,
});

export default createStore(combinedStore);
