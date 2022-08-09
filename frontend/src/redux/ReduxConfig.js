import { createStore, combineReducers } from "redux";
import { loadState, saveState } from "./LocalStorage";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const DECREASE_PRODUCT_FROM_CART = "DECREASE_PRODUCT_FROM_CART";
export const INCREASE_PRODUCT_FROM_CART = "INCREASE_PRODUCT_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";

const loginReducer = (state = 0, action) => {
  switch (action.type) {
    case LOGIN:
      console.log(action.payload);
      return action.payload;
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

const cartReducer = (state = [], action) => {
  let currentCart = [];
  let index = -1;

  switch (action.type) {
    case ADD_TO_CART:
      currentCart = cloneStore(state);
      let newItem = action.payload;

      index = currentCart.findIndex((t) => t._id === newItem._id);
      if (index !== -1) {
        let currentProduct = currentCart[index];
        currentProduct.quantity += 1;
      } else {
        newItem.quantity = 1;
        currentCart.push(newItem);
      }
      return currentCart;
    case REMOVE_FROM_CART:
      currentCart = cloneStore(state);
      let removingproductId = action.payload;

      currentCart = currentCart.filter((t) => t._id !== removingproductId);

      return currentCart;
    case DECREASE_PRODUCT_FROM_CART:
      currentCart = cloneStore(state);
      let productIdToDecr = action.payload;
      index = currentCart.findIndex((t) => t._id === productIdToDecr);

      if (index !== -1) {
        let currentProduct = currentCart[index];
        if (currentProduct.quantity >= 2) {
          currentProduct.quantity -= 1;
        } else {
          currentCart = currentCart.filter((t) => t._id !== productIdToDecr);
        }
      }
      return currentCart;
    case INCREASE_PRODUCT_FROM_CART:
      currentCart = cloneStore(state);
      let productIdToInc = action.payload;
      index = currentCart.findIndex((t) => t._id === productIdToInc);

      if (index !== -1) {
        let currentProduct = currentCart[index];
        currentProduct.quantity += 1;
      }
      return currentCart;
    case CLEAR_CART:
      return [];
    default:
      return state;
  }
};

function cloneStore(state) {
  let currentCart = [];
  if (state.length > 0 && state.length > 0) {
    currentCart = [...state];
  }
  return currentCart;
}

const reducer = combineReducers({ loginReducer, cartReducer });

const persistedState = loadState();
export const store = createStore(reducer, persistedState);

store.subscribe(() => {
  saveState(store.getState());
});

export const jwttokenSelector = (state) => state.loginReducer.token;
export const isUserLoggedInSelector = (state) =>
  !(jwttokenSelector(state) === 0);
export const userInfoSelector = (state) => {
  let clonedState = {};
  Object.assign(clonedState, state.loginReducer);

  delete clonedState.token;
  return clonedState;
};
export const cartSelector = (state) => state.cartReducer;
export const cartForCheckoutSelector = (state) => {
  let cart = [];
  Object.assign(cart, state.cartReducer);

  return cart.map((item) => {
    return { productId: item._id, quantity: item.quantity };
  });
};
