import axios from "axios";
// import md5 from 'md5';

import {messages} from "../resources/js/utils";
import {siteUrl} from "../common/config";

export const checkLogin = (props) =>
    axios.get(siteUrl + '/auth/check',
        {
            headers: {'sessionId': 'token'}
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
            }
        )

export const doLogin = (props) => {

    console.log(props.state.loginReducer);
    props.dispatch.changePasswordInput('');

    messages();

    // axios.post('/api/auth/login',
    //     {
    //         login: props.state.loginReducer.login,
    //         password: props.state.loginReducer.password,
    //         lang: props.state.loginReducer.lang
    //     })
    //     .then(
    //         resp => {
    //             props.dispatch.changePwt(resp.headers.pwt);
    //             props.dispatch.changeIsAuth(true);
    //             props.dispatch.changeIsShowLoginModal(false);
    //             props.dispatch.changePasswordInput('');
    //         },
    //         err => {
    //             props.dispatch.changePwt(null);
    //             props.dispatch.changePasswordInput('');
    //             messages(err.response.data);
    //         }
    //     )

}