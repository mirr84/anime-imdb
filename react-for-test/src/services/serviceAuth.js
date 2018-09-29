import axios from "axios";
import md5 from 'md5';

import {messages} from "../resources/js/utils";
import {siteUrl} from "../common/config";

export const checkLogin = (props) =>
    axios.get(siteUrl + '/auth/check',
        {
            headers: {'sessionId': props.state.loginReducer.token}
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

// console.log(props.state.loginReducer);
// props.dispatch.changePasswordInput('');
// messages();
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
                props.dispatch.changeSetToken(resp.data);
                checkLogin(props);
            },
            err => {
                props.dispatch.changePasswordInput('');
                props.dispatch.changeIsAuth(false);
                props.dispatch.changeSetToken('');
                messages();
            }
        )