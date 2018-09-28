import {
    actionChangeMenuCollapse, actionChangeMenuItem,

    actionChangeIsAuth, actionChangeLoginInput, actionChangePasswordInput

} from "./actions/actions";

export const dispatchs = (dispatch) =>
    (
        {
            dispatch:
                {

                    changeMenuCollapse: (v) => dispatch(actionChangeMenuCollapse(v)),
                    changeMenuItem: (v) => dispatch(actionChangeMenuItem(v)),

                    changeIsAuth: (v) => dispatch(actionChangeIsAuth(v)),
                    changeLoginInput: (v) => dispatch(actionChangeLoginInput(v)),
                    changePasswordInput: (v) => dispatch(actionChangePasswordInput(v)),

                }
        }
    )