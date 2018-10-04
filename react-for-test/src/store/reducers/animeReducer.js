import {
    ACTION_CHANGE_SET_ALL_LIST, ACTION_CHANGE_FILTER_NAME, ACTION_CHANGE_IS_PROGRESS_ALL_LIST,
    ACTION_CHANGE_OPEN_MODAL_ANIME
} from "../actions/actionConst";
import {getLocalStorage} from "../utils/getLocalStorage";

const initState = {
    allList: [],
    isProgressAllList: false,
    filter: { name: '' },
    modalAnime: false,
    idSelectAnime: null
}

export const animeReducer = (state = getLocalStorage('animeReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.type === ACTION_CHANGE_SET_ALL_LIST) {
        newState.allList = action.payload;
    }

    if (action.type === ACTION_CHANGE_FILTER_NAME) {
        newState.filter.name = action.payload;
    }

    if (action.type === ACTION_CHANGE_IS_PROGRESS_ALL_LIST) {
        newState.isProgressAllList = action.payload;
    }

    if (action.type === ACTION_CHANGE_OPEN_MODAL_ANIME) {
        newState.modalAnime = action.payload;
        newState.idSelectAnime = action.id;
    }

    return newState;

}