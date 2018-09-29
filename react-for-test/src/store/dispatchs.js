import {
    actionChangeMenuCollapse, actionChangeMenuItem, actionChangeMenuSetItems,

    actionChangeIsAuth, actionChangeLoginInput, actionChangePasswordInput, actionChangeSetToken

} from "./actions/actions";

export const dispatchs = (dispatch) =>
    (
        {
            dispatch:
                {

                    changeMenuCollapse: (v) => dispatch(actionChangeMenuCollapse(v)),
                    changeMenuItem: (v) => dispatch(actionChangeMenuItem(v)),
                    changeMenuSetItems: (v) => dispatch(actionChangeMenuSetItems(v)),

                    changeIsAuth: (v) => dispatch(actionChangeIsAuth(v)),
                    changeSetToken: (v) => dispatch(actionChangeSetToken(v)),
                    changeLoginInput: (v) => dispatch(actionChangeLoginInput(v)),
                    changePasswordInput: (v) => dispatch(actionChangePasswordInput(v)),

                }
        }
    )