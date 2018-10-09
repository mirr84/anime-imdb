import React from 'react';
import {connector} from "../store/utils/connector";
import {getAllListAnime} from "../services/serviceAnime";

import {Input, Table, Row, Col, Button} from 'reactstrap';
import lifecycle from "react-pure-lifecycle";
import LoadingOverlay from 'react-loading-overlay';

import {FaPencilAlt, FaImage} from 'react-icons/fa';

const methods = {
    componentDidMount(props) {
        getAllListAnime(props, true);
    }
}

const openFronShow = () => {
    alert('просмотр инфы');
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
                               getAllListAnime({state, dispatch}, true);
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
                        onClick={ (e) => dispatch.setter('animeReducer', { modalAnime: true, animeInfo: {}, idSelectAnime: null }) }
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
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    state.animeReducer.allList
                        .map(
                            (item, idx) =>
                                <tr style={ {cursor: 'pointer'} } key={idx}>
                                    <th onClick={ (e) => openFronShow({state, dispatch}) } scope="row">{idx + 1}</th>
                                    <td onClick={ (e) => openFronShow({state, dispatch}) } >{item.name}</td>
                                    <td onClick={ (e) => openFronShow({state, dispatch}) } >{item.genre}</td>
                                    <td onClick={ (e) => openFronShow({state, dispatch}) } >{item.col_season}/{item.col_part}</td>
                                    <td onClick={
                                            (e) => {
                                                if (item.url_image) {
                                                    dispatch.setter('animeReducer', { animeInfo: { url_image: item.url_image }, imageShow: true});
                                                }
                                            }
                                        }
                                    >
                                        {
                                            item.url_image ? <FaImage /> : ''
                                        }
                                    </td>
                                    <td onClick={ (e) => dispatch.setter('animeReducer', { modalAnime: true, animeInfo: {}, idSelectAnime: item.id }) } >
                                        <FaPencilAlt />
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