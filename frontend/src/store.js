import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { productListReducers, productDetailsReducers } from "./reducers/productReducers";
import {cartReducer} from "./reducers/cartReducers";

const reducer = combineReducers({
  cart: cartReducer,
  productList: productListReducers,
  productDetails: productDetailsReducers,
});

const cartItemsFromStorage = localStorage.getItem('cartItems');
const cartItems = cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [];

const initialState = {
  cart: {
    cartItems,
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
