import React from 'react';
import {connector} from "../store/utils/connector";
import {getAllListAnime} from "../services/serviceAnime";

import {Input, Table, Row, Col, Button} from 'reactstrap';
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

        <Row>
            <Col sm="4">
                <Input bsSize="sm" type="text" name="name" id="name" placeholder="Название"
                       value={state.animeReducer.filter.name}
                       onChange={
                           (e) => {
                               dispatch.setter('animeReducer', {filter: {name: e.target.value}});
                               getAllListAnime({state, dispatch});
                           }
                       }
                       onBlur={
                           () => {
                           }
                       }
                />
            </Col>
            <Col sm="6" />
            <Col sm="2">
                <Button color="primary"
                        onClick={() => {}}
                        size="sm">
                    Добавить свою
                </Button>
            </Col>
        </Row>

        <hr/>

        <LoadingOverlay
            active={state.animeReducer.isProgressAllList}
            background={'#f0f8ffbd'}
            color={'black'}
            spinner
            text='Получаем данные'
        >
            <Table size="sm" striped hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>
                        Название
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
                                <tr key={idx} style={ {cursor: 'pointer'} }
                                    onClick={ (e) => dispatch.setter('animeReducer', { modalAnime: true, animeInfo: [], idSelectAnime: item.id }) } >
                                    <th scope="row">{idx + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.genre}</td>
                                    <td>{item.col_season}/{item.col_part}</td>
                                    <td>{item.url_image}</td>
                                    <td></td>
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