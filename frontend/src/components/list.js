import React from 'react';
import {connector} from "../store/utils/connector";

import {
    Button,
    Input,
    Table,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Row,
    Col
} from 'reactstrap';

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

            <Button
                color={state.animeReducer.typeList === 'table' || !state.animeReducer.typeList ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => dispatch.setter('animeReducer', {typeList: 'table'})}>
                Таблицей
            </Button>{' '}
            <Button
                color={state.animeReducer.typeList === 'table' || !state.animeReducer.typeList ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => dispatch.setter('animeReducer', {typeList: 'card'})}>
                Плитками
            </Button>

            <hr/>

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
            </Row>

            <hr/>

            <LoadingOverlay
                active={state.animeReducer.isProgressAllList}
                background={'#f0f8ffbd'}
                color={'black'}
                spinner
                text='Получаем данные'
            >

                {
                    state.animeReducer.typeList === 'table' || !state.animeReducer.typeList ?
                        <Table size="sm" striped hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th></th>
                                <th>
                                    Название
                                </th>
                                <th>Жанр</th>
                                <th>Сезоны/Серии</th>
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
                                                            <td style={{cursor: 'pointer'}} onClick={() => {
                                                                dispatch.setter('animeReducer', { isProgressAllList: true } );
                                                                addMyListAnime({state, dispatch}, item.id);
                                                            }}>
                                                                <FaPlus/>
                                                            </td> :
                                                            <td>
                                                                <FaCheck/>
                                                            </td>
                                                    ) : (
                                                        <td></td>
                                                    )
                                                }

                                                <td>{item.name}</td>
                                                <td>{item.genre}</td>
                                                <td>{item.col_season}/{item.col_part}</td>
                                            </tr>
                                    )
                            }
                            </tbody>
                        </Table> : ''
                }

                {
                    state.animeReducer.typeList === 'card' ?
                        <Row>
                            {
                                state.animeReducer.allList
                                    .map(
                                        (item, idx) =>
                                            <Col sm="4" key={idx}>
                                                <Card>
                                                    <CardImg top width="100%"
                                                             src={item.url_image} />
                                                    <CardBody>
                                                        <CardTitle>{item.name}</CardTitle>
                                                        <CardSubtitle>{item.genre}</CardSubtitle>
                                                        <CardText>{item.col_season}/{item.col_part}</CardText>
                                                        <Button size={'sm'}>Button</Button>
                                                    </CardBody>
                                                </Card>
                                                <br/>
                                            </Col>
                                    )
                            }
                        </Row>
                        :
                        ''
                }


            </LoadingOverlay>

        </div>
    )

}

export default connector(lifecycle(methods)(List));