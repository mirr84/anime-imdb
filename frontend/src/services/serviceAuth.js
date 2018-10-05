import axios from "axios";
import md5 from 'md5';

import {messages} from "../resources/js/utils";
import {siteUrl} from "../common/config";

export const checkLogin = (props, once_exit=false) =>
    axios.get(siteUrl + '/auth/check',
        {
            headers: {'sessionId': once_exit? '' : props.state.loginReducer.token}
        }
    )
        .then(
            (resp) => resp.data,
            (err) => err.response.data
        )

export const doLogin = (props) =>
    axios.post(siteUrl + '/auth/login',
        {
            login: props.state.loginReducer.login,
            password: md5(props.state.loginReducer.password)
        })
        .then(
            resp => {
                props.dispatch.setter('loginReducer', { password: '',  isAuth: true, token: resp.data.token } );
                props.dispatch.setter('menuReducer', {  menu: resp.data.menu, item: 'my_list' } );
            },
            err => {
                props.dispatch.setter('loginReducer', { password: '',  isAuth: false, token: '' } );
                props.dispatch.setter('menuReducer', {  menu: err.response.data.menu, item: '' } );
                messages(err.response.data, true);
            }
        )

export const doReg = (props) =>
    axios.post(siteUrl + '/auth/reg',
    {
        login: props.state.loginReducer.login,
        password: md5(props.state.loginReducer.password),
        email: props.state.loginReducer.email
    })
    .then(
        resp => {
        },
        err => {
            messages(err.response.data, true);
        }
    )
