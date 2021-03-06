import {
    ACTION_IS_AUTH,
    ACTION_CHANGE_LOGIN_INPUT,
    ACTION_CHANGE_PASSWORD_INPUT,
    ACTION_CHANGE_EMAIL_INPUT,
    ACTION_SET_TOKEN} from "../actions/actionConst";

import {getLocalStorage} from "../utils/getLocalStorage";

const initState = {
    login: '',
    password: '',
    isAuth: false,
    email: 'mail@mail.ru',
    token: ''
}

export const loginReducer = (state = getLocalStorage('loginReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.type === ACTION_CHANGE_LOGIN_INPUT) {
        newState.login = action.payload;
    }

    if (action.type === ACTION_CHANGE_PASSWORD_INPUT) {
        newState.password = action.payload;
    }

    if (action.type === ACTION_IS_AUTH) {
        if (action.payload) {
            // newState = initState;
        }
        newState.isAuth = action.payload;
    }

    if (action.type === ACTION_SET_TOKEN) {
        if (action.payload) {
            // newState = initState;
        }
        newState.token = action.payload;
    }

    if (action.type === ACTION_CHANGE_EMAIL_INPUT) {
        newState.email = action.payload;
    }

    return newState;

}