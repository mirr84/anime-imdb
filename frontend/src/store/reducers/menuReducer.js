import {ACTION_MENU_COLLAPSE, ACTION_MENU_ITEM, ACTION_MENU_SET_ITEMS, ACTION_SETTER} from "../actions/actionConst";
import {getLocalStorage} from "../utils/getLocalStorage";

const initState = {
    collapse: false,
    item: '',
    menu: {}
}


export const menuReducer = (state = getLocalStorage('menuReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.reducer === 'menuReducer') {
        if (action.type === ACTION_SETTER) {
            newState = Object.assign(state, action.payload);
        }
    }

    // --

    if (action.type === ACTION_MENU_COLLAPSE) {
        newState.collapse = action.payload;
    }

    if (action.type === ACTION_MENU_ITEM) {
        newState.item = action.payload;
    }

    if (action.type === ACTION_MENU_SET_ITEMS) {
        newState.menu = action.payload;
    }

    return newState;

}