import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
// import  thunkMiddleware from 'redux-thunk'

import reducer from './store/reducers/index';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-viewer/dist/index.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

import App from "./App";

import axios from "axios";

// const store = createStore(reducer, applyMiddleware(thunkMiddleware));
const store = createStore(reducer);
store.subscribe(() => localStorage.setItem('store', JSON.stringify(store.getState())));

axios.interceptors.request.use(
    (config) => {
        return Promise.resolve(config);
    },
    (error) => {
        return Promise.reject(error);
    }
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);