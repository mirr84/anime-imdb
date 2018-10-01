import {
    ACTION_CHANGE_SET_ALL_LIST, ACTION_CHANGE_FILTER_NAME
} from "../actions/actionConst";
import {getLocalStorage} from "../utils/getLocalStorage";

const initState = {
    allList: [],
    filter: { name: '' }
}

export const animeReducer = (state = getLocalStorage('animeReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.type === ACTION_CHANGE_SET_ALL_LIST) {
        newState.allList = action.payload;
    }

    if (action.type === ACTION_CHANGE_FILTER_NAME) {
        newState.filter.name = action.payload;
    }

    return newState;

}