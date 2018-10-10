import React from 'react';
import {connector} from "../store/utils/connector";

import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
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
                   toggle={() => {
                   }}
                   size={'lg'}
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

                        {
                            state.animeReducer.animeInfo.last_see
                        }
                        <br/>
                        {
                            state.animeReducer.animeInfo.last_date
                        }

                        <DatePicker
                            selected={moment()}
                            onChange={(e) => { console.log(e) }}
                            dateFormat="DD.MM.YYYY"
                        />

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