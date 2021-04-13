import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { productListReducers, productDetailsReducers } from "./reducers/productReducers";
import {cartReducer} from "./reducers/cartReducers";
import {userLoginReducer} from "./reducers/userReducers";

const reducer = combineReducers({
  cart: cartReducer,
  userLogin: userLoginReducer,
  productList: productListReducers,
  productDetails: productDetailsReducers,
});

const cartItemsFromStorage = localStorage.getItem('cartItems');
const cartItems = cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [];

const userInfoFromStorage = localStorage.getItem('userInfo');
const userInfo = userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null;

const initialState = {
  cart: {
    cartItems,
  },
  userLogin: {
    userInfo,
  }
};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

window.store = store;

export default store;
