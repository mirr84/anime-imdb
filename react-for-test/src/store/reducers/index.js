import {combineReducers} from 'redux';

import {menuReducer} from "./menuReducer";
import {loginReducer} from "./loginReducer";

export default combineReducers(
    {

        menuReducer,
        loginReducer

    }
);