
// import axios from "axios";
// import md5 from 'md5';

import {messages} from "../resources/js/utils";

export const checkLogin = (props) => {
    // axios.post('/api/auth/checkLogin',
    //     {lang: props.state.loginReducer.lang}
    // )
    //     .then(
    //         resp => {
    //             props.dispatch.changeIsShowLoginModal(false);
    //             props.dispatch.changeIsAuth(true);
    //         },
    //         err => {
    //             messages(err.response.data);
    //             props.dispatch.changeIsShowLoginModal(true);
    //             props.dispatch.changeIsAuth(false);
    //         }
    //     )
}

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