import {ACTION_MENU_COLLAPSE, ACTION_MENU_ITEM} from "../actions/actionConst";
import {getLocalStorage} from "../utils/getLocalStorage";

const initState = {
    collapse: false,
    item: ''
}

export const menuReducer = (state = getLocalStorage('menuReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.type === ACTION_MENU_COLLAPSE) {
        newState.collapse = action.payload;
    }

    if (action.type === ACTION_MENU_ITEM) {
        newState.item = action.payload;
    }

    return newState;

}