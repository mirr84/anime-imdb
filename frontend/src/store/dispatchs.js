import {
    actionChangeMenuCollapse, actionChangeMenuItem, actionChangeMenuSetItems,

    actionChangeIsAuth, actionChangeLoginInput, actionChangePasswordInput, actionChangeSetToken, actionChangeEmailInput,

    actionChangeSetAllList, actionChangeFilterName, actionChangeIsProgressAllList, actionChangeOpenModalAnime

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
                    changeEmailInput: (v) => dispatch(actionChangeEmailInput(v)),

                    changeSetAllList: (v) => dispatch(actionChangeSetAllList(v)),
                    changeFilterName: (v) => dispatch(actionChangeFilterName(v)),
                    changeIsProgressAllList: (v) => dispatch(actionChangeIsProgressAllList(v)),

                    changeOpenModalAnime: (v, id) => dispatch(actionChangeOpenModalAnime(v, id)),
                }
        }
    )