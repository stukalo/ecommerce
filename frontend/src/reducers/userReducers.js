import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT} from "../constants/userConstants";


export const userLoginReducer = (
    state = {error: null},
    action
) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {loading: true, userInfo: null, error: null};
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload, error: null};
        case USER_LOGIN_FAIL:
            return {loading: false, userInfo: null, error: action.payload};
        case USER_LOGOUT:
            return {error: null};
        default:
            return state;
    }
};