import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { productListReducers, productDetailsReducers } from "./reducers/productReducers";
import {cartReducer} from "./reducers/cartReducers";
import {
  userDetailsReducer, userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer
} from "./reducers/userReducers";
import {orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer} from "./reducers/orderReducers";

const reducer = combineReducers({
  cart: cartReducer,
  orderPay: orderPayReducer,
  userList: userListReducer,
  userLogin: userLoginReducer,
  productList: productListReducers,
  userDetails: userDetailsReducer,
  orderCreate: orderCreateReducer,
  userRegister: userRegisterReducer,
  orderDetails: orderDetailsReducer,
  myOrdersList: orderListMyReducer,
  productDetails: productDetailsReducers,
  userUpdateProfile: userUpdateProfileReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems');
const cartItems = cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [];

const userInfoFromStorage = localStorage.getItem('userInfo');
const userInfo = userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress');
const shippingAddress = shippingAddressFromStorage ? JSON.parse(shippingAddressFromStorage) : {};

const paymentMethod = localStorage.getItem('paymentMethod') || null;

const initialState = {
  cart: {
    cartItems,
    paymentMethod,
    shippingAddress,
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
