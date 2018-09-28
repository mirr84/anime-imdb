import {connect} from "react-redux";
import {dispatchs} from "../dispatchs";

export const connector = (component) => connect(
    state => ({state}),
    dispatch => dispatchs(dispatch)
)(component);