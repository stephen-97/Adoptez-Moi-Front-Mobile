import { createStore, combineReducers } from "redux";

const initialState = {
  order: null,
  specie: [],
  sex: null,
  department: null,
  priceRange: null,
};

const FavoriteReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_VALUE":
      return [action.the_data];
    default:
      return state;
  }
};

const FilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_FILTER_DATA":
      return action.dataFilter;
    default:
      return state;
  }
};

const SendNavPropsReducer = (state = null, action) => {
  switch (action.type) {
    case "NAV_PROPS":
      return action.navigationProps;
    default:
      return state;
  }
};

const SendNavAccountPropsReducer = (state = null, action) => {
  switch (action.type) {
    case "NAV_ACCOUNT_PROPS":
      return action.navigationProps;
    default:
      return state;
  }
};

const AuthentificationReducer = (state = {}, action) => {
  switch (action.type) {
    case "AUTH_PROPS":
      return action.authentificationProps;
    default:
      return state;
  }
};

const DeleteAnimalReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_ANIMAL_PROPS":
      return action.dataAnimalforDeleting;
    default:
      return state;
  }
};

const DeleteAnimalAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_ADMIN_ANIMAL_PROPS":
      return action.dataAnimalAdminforDeleting;
    default:
      return state;
  }
};

const DeleteUserAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_ADMIN_USER_PROPS":
      return action.dataUserAdminforDeleting;
    default:
      return state;
  }
};

const combinedStore = combineReducers({
  SendNavPropsReducer,
  FavoriteReducer,
  FilterReducer,
  AuthentificationReducer,
  SendNavAccountPropsReducer,
  DeleteAnimalReducer,
  DeleteAnimalAdminReducer,
  DeleteUserAdminReducer,
});

export default createStore(combinedStore);
