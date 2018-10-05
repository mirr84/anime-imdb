import React from 'react';
import {connector} from "../store/utils/connector";

import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import LoadingOverlay from "react-loading-overlay";
import {infoMyListAnime, remoteMyListAnime} from "../services/serviceAnime";

const ModalAnime = ({state, dispatch}) => {

    return (
        <div>

            <Modal isOpen={state.animeReducer.modalAnime}
                   toggle={ () => {} }
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
                <ModalHeader toggle={() => dispatch.setter('animeReducer', { modalAnime: false  }) }>Информация о твоей анимешке</ModalHeader>
                <ModalBody>

                    <LoadingOverlay
                        active={state.animeReducer.isProgressInfo}
                        background={'#f0f8ffbd'}
                        color={'black'}
                        spinner
                        text='Получаем данные по выбранной анимешке'
                    >

                        <div>
                            {
                                JSON.stringify(state.animeReducer.animeInfo)
                            }
                        </div>

                    </LoadingOverlay>

                </ModalBody>
                <ModalFooter>
                    <Button color="warning"
                            style={ { left: '16px', position: 'absolute' } }
                            onClick={
                                () => {
                                    dispatch.setter('animeReducer', {modalAnime: false, isProgressAllList: true});
                                    remoteMyListAnime({state, dispatch}, state.animeReducer.idSelectAnime);
                                }
                            }
                            disabled={state.animeReducer.isProgressInfo}
                            size="sm">
                        Удалить из моего списка
                    </Button>{' '}
                    <Button color="primary"
                            disabled={state.animeReducer.isProgressInfo}
                            onClick={() => alert('3')}
                            size="sm">
                        Внести изменение
                    </Button>{' '}
                    <Button color="secondary"
                            onClick={() => dispatch.setter('animeReducer', { modalAnime: false  }) }
                            size="sm">
                        Закрыть
                    </Button>
                </ModalFooter>
            </Modal>

        </div>
    )

}

export default connector(ModalAnime);