import {
    GET_HISTORY_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS, LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS
} from "../actions/usersActions";

const initialState = {
    registerError: null,
    loginError: null,
    history: null,
    token: null,
    user: null
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case REGISTER_USER_SUCCESS:
            return {...state, registerError: null};

        case REGISTER_USER_FAILURE:
            return ({
                ...state,
                registerError: action.error
            });

        case LOGIN_USER_SUCCESS:
            return {...state, user: action.user, token: action.user.token, loginError: null};

        case LOGIN_USER_FAILURE:
            return {...state, loginError: action.error};

        case LOGOUT_USER:
            return {...state, user: null};

        case GET_HISTORY_SUCCESS:
            return {...state, history: action.history};

        default:
            return state;
    }
};

export default usersReducer;