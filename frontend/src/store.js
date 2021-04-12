import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { productListReducers, productDetailsReducers } from "./reducers/productReducers";

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
});

const initialState = {};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
