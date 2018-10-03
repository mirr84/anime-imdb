import axios from "axios";

import {siteUrl} from "../common/config";

export const getAllListAnime = (props) =>
    axios.post(siteUrl + '/anime/list',
        {
            name: props.state.animeReducer.filter.name
        },
        {
            headers: {'sessionId': props.state.loginReducer.token}
        }
    )
        .then(
            (resp) => props.dispatch.changeSetAllList(resp.data),
            (err) => props.dispatch.changeSetAllList([])
        )

// get: /anime/add?id=<id_anime> => Headers { token: <token> }
export const addMyListAnime = (props, id) => {

    axios.get(siteUrl + '/anime/add', {
            headers: {'sessionId': props.state.loginReducer.token},
            params: { id }
        }
    )
        .then(
            (resp) => { console.log( resp.data ) },
            (err) => { console.log( err ) }
        )

}