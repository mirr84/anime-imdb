import axios from "axios";

import {siteUrl} from "../common/config";

export const getAllListAnime = (props, only_user = false) => {

    props.dispatch.setter('animeReducer', {isProgressAllList: true});

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
            (resp) => props.dispatch.setter('animeReducer', {allList: resp.data}),
            (err) => props.dispatch.setter('animeReducer', {allList: []})
        )
        .then(
            (result) => props.dispatch.setter('animeReducer', {isProgressAllList: false})
        )

}

// get: /anime/add?id=<id_anime> => Headers { token: <token> }
export const addMyListAnime = (props, id) =>
    axios.get(siteUrl + '/anime/add', {
            headers: {'sessionId': props.state.loginReducer.token},
            params: {id}
        }
    )
        .then(
            (resp) => getAllListAnime(props),
            (err) => {
            }
        )

// get: /anime/add?id=<id_anime> => Headers { token: <token> }
export const remoteMyListAnime = (props, id) =>
    axios.get(siteUrl + '/anime/remote', {
            headers: {'sessionId': props.state.loginReducer.token},
            params: {id}
        }
    )
        .then(
            (resp) => getAllListAnime(props, true),
            (err) => {
            }
        )

// get: /anime/info?id=<id_anime> => Headers { token: <token> }
export const infoMyListAnime = (props, id) =>
    axios.get(siteUrl + '/anime/info', {
            headers: {'sessionId': props.state.loginReducer.token},
            params: {id}
        }
    )
        .then(
            (resp) => resp.data[0],
            (err) => err.response.data
        )

export const autocompleteGenre = (props, name) =>
    axios.get(siteUrl + '/autocomplete/genre', {
            params: {name}
        }
    )
        .then(
            (resp) => resp.data,
            (err) => [] // err.response.data
        )

export const editMyListAnime = (props) =>
    axios.post(siteUrl + '/anime/edit',
        {
            anime: props.state.animeReducer.animeInfo
        },
        {
            headers: {'sessionId': props.state.loginReducer.token}
        }
    )
        .then(
            (resp) => resp.data,
            (err) => err.response.data
        )

export const editMySeeAnime = (props) =>
    axios.post(siteUrl + '/anime/see',
        {
            anime: props.state.animeReducer.animeInfo
        },
        {
            headers: {'sessionId': props.state.loginReducer.token}
        }
    )
        .then(
            (resp) => resp.data,
            (err) => err.response.data
        )