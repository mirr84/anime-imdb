import React from 'react';
import {connector} from "../store/utils/connector";

import {Input, Table} from 'reactstrap';
import lifecycle from "react-pure-lifecycle";
import {getAllListAnime, addMyListAnime} from "../services/serviceAnime";
import {FaPlus, FaCheck} from 'react-icons/fa';
import LoadingOverlay from 'react-loading-overlay';

const methods = {
    componentDidMount(props) {
        getAllListAnime(props, false);
    }
}

const List = ({state, dispatch}) => {

    return (
        <div>

            <LoadingOverlay
                active={state.animeReducer.isProgressAllList}
                spinner
                text='Получаем данные'
            >

                <Table size="sm" striped hover>
                <thead>
                <tr>
                    <th>#</th>
                    {
                        state.loginReducer.isAuth ? (
                            <th></th>
                        ) : (
                            ''
                        )
                    }
                    <th>
                        Название <br/>
                        <Input bsSize="sm" type="text" name="name" id="name" placeholder="Название"
                               value={state.animeReducer.filter.name}
                               onChange={
                                   (e) => {
                                       dispatch.changeFilterName(e.target.value);
                                       getAllListAnime({state, dispatch});
                                   }
                               }
                               onBlur={
                                   () => {
                                   }
                               }
                        />
                    </th>
                    <th>Жанр</th>
                    <th>Сезоны/Серии</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    state.animeReducer.allList
                        .map(
                            (item, idx) =>
                                <tr key={idx}>
                                    <th scope="row">{idx + 1}</th>

                                    {
                                        state.loginReducer.isAuth ? (
                                            item.isNoAdd === 0 ?
                                            <td style={{cursor: 'pointer'}} onClick={ () => { addMyListAnime({state, dispatch}, item.id); }}>
                                                <FaPlus />
                                            </td> :
                                            <td>
                                                <FaCheck />
                                            </td>
                                        ) : (
                                            ''
                                        )
                                    }

                                    <td>{item.name}</td>
                                    <td>{item.genre}</td>
                                    <td>{item.col_season}/{item.col_part}</td>
                                    <td>{item.url_image}</td>
                                </tr>
                        )
                }
                </tbody>
            </Table>

            </LoadingOverlay>

        </div>
    )

}

export default connector(lifecycle(methods)(List));