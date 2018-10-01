import {combineReducers} from 'redux';

import {menuReducer} from "./menuReducer";
import {loginReducer} from "./loginReducer";
import {animeReducer} from "./animeReducer";

export default combineReducers(
    {

        menuReducer,
        loginReducer,
        animeReducer

    }
);