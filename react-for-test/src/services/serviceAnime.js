import axios from "axios";

import {siteUrl} from "../common/config";

export const getAllListAnime = (props) =>
    axios.post(siteUrl + '/anime/list', {
        name: props.state.animeReducer.filter.name
        }
    )
        .then(
            (resp) => props.dispatch.changeSetAllList(resp.data),
            (err) => props.dispatch.changeSetAllList([])
        )