import {
    ACTION_MENU_COLLAPSE, ACTION_MENU_ITEM, ACTION_MENU_SET_ITEMS, ACTION_SET_TOKEN,

    ACTION_IS_AUTH, ACTION_CHANGE_LOGIN_INPUT, ACTION_CHANGE_PASSWORD_INPUT

} from "./actionConst";

export const actionChangeMenuCollapse = (payload) => (
    {
        type: ACTION_MENU_COLLAPSE,
        payload
    }
)

export const actionChangeMenuItem = (payload) => (
    {
        type: ACTION_MENU_ITEM,
        payload
    }
)

export const actionChangeMenuSetItems = (payload) => (
    {
        type: ACTION_MENU_SET_ITEMS,
        payload
    }
)

export const actionChangeIsAuth = (payload) => (
    {
        type: ACTION_IS_AUTH,
        payload
    }
)

export const actionChangeSetToken = (payload) => (
    {
        type: ACTION_SET_TOKEN,
        payload
    }
)

export const actionChangeLoginInput = (payload) => (
    {
        type: ACTION_CHANGE_LOGIN_INPUT,
        payload
    }
)

export const actionChangePasswordInput = (payload) => (
    {
        type: ACTION_CHANGE_PASSWORD_INPUT,
        payload
    }
)