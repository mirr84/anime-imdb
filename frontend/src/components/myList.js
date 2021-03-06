import React from 'react';
import {connector} from "../store/utils/connector";
import {getAllListAnime} from "../services/serviceAnime";

import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table} from 'reactstrap';
import lifecycle from "react-pure-lifecycle";
import LoadingOverlay from 'react-loading-overlay';

const methods = {
    componentDidMount(props) {
        getAllListAnime(props, true);
    }
}

const MyList = ({state, dispatch}) => {

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
                    <th>
                        Название <br/>
                        <Input bsSize="sm" type="text" name="name" id="name" placeholder="Название"
                               value={state.animeReducer.filter.name}
                               onChange={
                                   (e) => {
                                       dispatch.changeFilterName(e.target.value);
                                       getAllListAnime({state, dispatch}, true);
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
                    <th>Кнопки</th>
                </tr>
                </thead>
                <tbody>
                {
                    state.animeReducer.allList
                        .map(
                            (item, idx) =>
                                <tr key={idx} onClick={ (e) => dispatch.changeOpenModalAnime(true, item.id) } >
                                    <th scope="row">{idx + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.genre}</td>
                                    <td>{item.col_season}/{item.col_part}</td>
                                    <td>{item.url_image}</td>

                                    <td>

                                    </td>

                                </tr>
                        )
                }
                </tbody>
            </Table>

        </LoadingOverlay>
    </div>
  )

}

export default connector(lifecycle(methods)(MyList));