import axios from "axios";
import md5 from 'md5';

import {messages} from "../resources/js/utils";
import {siteUrl} from "../common/config";

export const checkLogin = (props, once_exit=false) =>
    axios.get(siteUrl + '/auth/check',
        {
            headers: {'sessionId': once_exit?'' : props.state.loginReducer.token}
        }
    )
        .then(
            (resp) => {
                props.dispatch.changeIsAuth(true);
                props.dispatch.changeMenuSetItems(resp.data);
            },
            (err) => {
                props.dispatch.changeIsAuth(false);
                props.dispatch.changeMenuSetItems(err.response.data);
                props.dispatch.changeSetToken('');
            }
        )

export const doLogin = (props) =>
    axios.post(siteUrl + '/auth/login',
        {
            login: props.state.loginReducer.login,
            password: md5(props.state.loginReducer.password)
        })
        .then(
            resp => {
                props.dispatch.changePasswordInput('');
                props.dispatch.changeIsAuth(true);
                props.dispatch.changeSetToken(resp.data.token);
                props.dispatch.changeMenuSetItems(resp.data.menu);
                props.dispatch.changeMenuItem('my_list');
            },
            err => {
                props.dispatch.changePasswordInput('');
                props.dispatch.changeIsAuth(false);
                props.dispatch.changeSetToken('');
                props.dispatch.changeMenuSetItems(err.response.data.menu);
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
