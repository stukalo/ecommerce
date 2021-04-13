import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: []}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const { payload } = action;
            const existItem = state.cartItems.find(el => el.product === payload.product);
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(el => el.product === payload.product ? payload : el)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, payload],
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(el => el.product !== action.payload),
            }
        default:
            return state;
    }
}