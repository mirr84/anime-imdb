import {
    actionChangeMenuCollapse, actionChangeMenuItem, actionChangeMenuSetItems,

    actionChangeIsAuth, actionChangeLoginInput, actionChangePasswordInput, actionChangeSetToken, actionChangeEmailInput,

    actionChangeSetAllList, actionChangeFilterName, actionChangeIsProgressAllList, actionChangeOpenModalAnime,


    actionSetter

} from "./actions/actions";

export const dispatchs = (dispatch) =>
    (
        {
            dispatch:
                {

                    setter: (reducer, v) => dispatch(actionSetter(reducer, v)),

                }
        }
    )