import React from 'react';
import {connector} from "../store/utils/connector";

import {Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import LoadingOverlay from "react-loading-overlay";

import lifecycle from "react-pure-lifecycle";
import {infoMyListAnime} from "../services/serviceAnime";

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/ru';

const methods = {
    componentDidMount(props) {
    }
}

const ModalAnimeRegSee = ({state, dispatch}) => {

    return (
        <div>

            <Modal isOpen={state.animeReducer.modalAnimeRegSee}
                   toggle={() => {}}
                   size={'xs'}
                   onOpened={
                       () => {
                               dispatch.setter('animeReducer', {isProgressInfo: true});
                               infoMyListAnime({state, dispatch}, state.animeReducer.idSelectAnime)
                                   .then(
                                       (result) => {
                                           dispatch.setter('animeReducer', {animeInfo: result, isProgressInfo: false});
                                       }
                                   )
                       }
                   }
            >

                <ModalHeader toggle={() => dispatch.setter('animeReducer', {modalAnimeRegSee: false})}>
                    Внос данных о просмотре
                </ModalHeader>

                <ModalBody>

                    <LoadingOverlay
                        active={state.animeReducer.isProgressInfo}
                        background={'#f0f8ffbd'}
                        color={'black'}
                        spinner
                        text='Получаем данные по выбранной анимешке'
                    >

                                <FormGroup row>

                                    <Label for="last_date" sm={8}>Дата выхода последней просмотренной</Label>
                                    <Col sm={4}>
                                        <DatePicker
                                            id="last_date"
                                            name="last_date"
                                            className={'form-control-sm form-control'}
                                            selected={
                                                state.animeReducer.animeInfo.last_date === '0000-00-00' ? moment() : moment(state.animeReducer.animeInfo.last_date, 'YYYY-MM-DD')
                                            }
                                            onChange={(e) => dispatch.setter('animeReducer', {animeInfo: Object.assign(state.animeReducer.animeInfo, {last_date: e.format('YYYY-MM-DD')})})}
                                            dateFormat="DD.MM.YYYY"
                                        />
                                    </Col>

                                    <Label for="last_see" sm={8}>Номер серии</Label>
                                    <Col sm={4}>
                                        <Input type="select" name="last_see" id="last_see"
                                               bsSize="sm" value={state.animeReducer.animeInfo.last_see}
                                               onChange={(e) => dispatch.setter('animeReducer', {animeInfo: Object.assign(state.animeReducer.animeInfo, {last_see: e.target.value})})}>
                                            {
                                                Array.apply(null, {length: 2000}).map(Number.call, Number)
                                                    .map(
                                                        (item, idx) => <option key={idx}
                                                                               value={item + 1}>{item + 1}</option>
                                                    )
                                            }
                                        </Input>
                                    </Col>

                                    <Col sm={12}>
                                        Сообщение
                                    </Col>

                                </FormGroup>

                    </LoadingOverlay>

                </ModalBody>
                <ModalFooter>

                    <Button color="primary"
                            disabled={state.animeReducer.isProgressInfo}
                            onClick={() => {}
                            }
                            size="sm">
                        Внести изменение
                    </Button>

                    {' '}

                    <Button color="secondary"
                            onClick={() => dispatch.setter('animeReducer', {modalAnimeRegSee: false})}
                            size="sm">
                        Закрыть
                    </Button>

                </ModalFooter>
            </Modal>

        </div>
    )

}

export default connector(lifecycle(methods)(ModalAnimeRegSee));