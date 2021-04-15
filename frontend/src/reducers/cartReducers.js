import {
    CART_ADD_ITEM, CART_CLEAR_ITEMS,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from "../constants/cartConstants";

export const cartReducer = (state = {cartItems: []}, action) => {
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
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }
        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: [],
            }
        default:
            return state;
    }
}