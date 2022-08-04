import { createStore, combineReducers } from "redux";

export const LOGIN = "LOGIN";

const loginReducer = (state = 0, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({ loginReducer });
export const store = createStore(reducer);

store.subscribe(() => {
  console.log("curent state", store.getState());
});

export const jwttokenSelector = (state) => state.loginReducer;