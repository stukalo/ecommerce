import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants';

export const productListReducers = (
    state = {loading: false, products: [], error: null},
    action
) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: [], error: null};
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload, error: null};
        case PRODUCT_LIST_FAIL:
            return {loading: false, products: [], error: action.error};
        default:
            return state;
    }
};

export const productDetailsReducers = (
    state = {loading: false, product: null, error: null},
    action
) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true, product: null, error: null};
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload, error: null};
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, product: null, error: action.error};
        default:
            return state;
    }
};
