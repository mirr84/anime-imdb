import axios from "axios";

import {siteUrl} from "../common/config";

export const getAllListAnime = (props, only_user = false) => {

    props.dispatch.setter('animeReducer', { isProgressAllList: true } );

    return axios.post(siteUrl + '/anime/list',
        {
            name: props.state.animeReducer.filter.name,
            only_user
        },
        {
            headers: {'sessionId': props.state.loginReducer.token}
        }
    )
        .then(
            (resp) => props.dispatch.setter('animeReducer', { allList: resp.data } ),
            (err) => props.dispatch.setter('animeReducer', { allList: [] } )
        )
        .then (
            (result) => props.dispatch.setter('animeReducer', { isProgressAllList: false } )
        )

}

// get: /anime/add?id=<id_anime> => Headers { token: <token> }
export const addMyListAnime = (props, id) =>
    axios.get(siteUrl + '/anime/add', {
            headers: {'sessionId': props.state.loginReducer.token},
            params: { id }
        }
    )
        .then(
            (resp) => getAllListAnime(props),
            (err) => {
            }
        )