import {ACTION_SETTER} from "../actions/actionConst";
import {getLocalStorage} from "../utils/getLocalStorage";

const initState = {
    allList: [],

    isProgressAllList: false,
    isProgressInfo: false,

    filter: { name: '' },
    modalAnime: false,
    idSelectAnime: null,
    typeList: 'table',
    animeInfo: null

}

export const animeReducer = (state = getLocalStorage('animeReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.reducer === 'animeReducer') {
        if (action.type === ACTION_SETTER) {
            newState = Object.assign(state, action.payload);
        }
    }

    return newState;

}