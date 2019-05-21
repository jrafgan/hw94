import {push} from 'connected-react-router';
import axios from '../../axios-api';
import {NotificationManager} from "react-notifications"

export const REGISTER_USER_SUCCESS = 'REGISTER_USER _SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER _FAILURE';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS';

const registerUserSuccess = user => ({type: REGISTER_USER_SUCCESS, user});
const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});
const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});
const getHistorySuccess = history => ({type: GET_HISTORY_SUCCESS, history});

export const facebookLogin = userData => {
    return dispatch =>{
        return axios.post('/users/facebookLogin', userData).then(
            response=>{
                dispatch(loginUserSuccess(response.data.user));
                dispatch(push('/'));
            },
            ()=>{dispatch(loginUserFailure('Login via Facebook failed'))}
        )
    }
};

export const logoutUser = () => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};
        return axios.delete('/users/sessions', config).then(() => {dispatch({type: LOGOUT_USER});
                NotificationManager.success('Logged out !');
            },
            error => {
                if (error.response) {
                    dispatch(registerUserFailure(error.response.data));
                    NotificationManager.error('Could not logout !');
                } else {
                    dispatch(registerUserFailure({global: "No network connection "}))
                }
            }

        )
    }
};

export const registerUser = userData => {
    return dispatch => {
        return axios.post('/users', userData).then(response => {
                dispatch(registerUserSuccess(response.data.user));
                NotificationManager.success('Registered successfully !');
                dispatch(push('/'));
            },
            error => {
                if (error.response) {
                    dispatch(registerUserFailure(error.response.data));
                    NotificationManager.error('Could not register !');
                } else {
                    dispatch(registerUserFailure({global: "No network connection "}))
                }
            }
        )
    }
};

export const loginUser = userData => {
    return dispatch => {
        return axios.post('/users/sessions', userData).then(response => {
                dispatch(loginUserSuccess(response.data.user));
                NotificationManager.success('Logged in successfully !');
                dispatch(push('/'));
            },
            error => {
                if (error.response) {
                    dispatch(loginUserFailure(error.response.data));
                } else {
                    dispatch(loginUserFailure({global: "No network connection "}))
                }
            }
        )
    }
};

export const saveTrack = trackId => {
    return dispatch => {
        return axios.post('/tracks_history', {trackId: trackId}).then(
            response => {
                NotificationManager.success('Track saved successfully !');
            },
            error => {
                if (error.response) {
                    console.log(error.response.data)
                } else {
                    dispatch(loginUserFailure({global: "No network connection "}))
                }
            });
    };
};

export const getHistory = () => {
    return dispatch => {

        return axios.get('/tracks_history').then(
            response => {
                dispatch(getHistorySuccess(response.data));
            },
            error => {
                if (error.response) {
                    dispatch(push('/'));
                } else {
                    dispatch(loginUserFailure({global: "No network connection "}))
                }
            });
    };
};