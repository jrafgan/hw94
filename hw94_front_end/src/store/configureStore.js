import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import usersReducer from "./reducers/usersReducer";
import thunkMiddleware from "redux-thunk";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import axios from '../axios-api';
import musicReducer from "./reducers/musicReducer";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    music: musicReducer,
    users: usersReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];


const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(()=> {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user
        }
    })
});

axios.interceptors.request.use(config=>{
    try {
      config.headers['Authorization'] = store.getState().users.user.token
    } catch (e) {
        // do nothing, user is not logged in
    }
    return config;
});

export default store;