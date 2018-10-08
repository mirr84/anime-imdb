import React from 'react';
import {connector} from "../store/utils/connector";

import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Row, Col, Input, FormGroup, Label} from "reactstrap";
import LoadingOverlay from "react-loading-overlay";
import {infoMyListAnime, remoteMyListAnime} from "../services/serviceAnime";

import ModalConfirm from './modalConfirm';

const ModalAnime = ({state, dispatch}) => {

    return (
        <div>

            <ModalConfirm isOpen={state.animeReducer.modalConfirm}
                          text={'Удалить запись?'}
                          success={() => {
                              dispatch.setter('animeReducer', {
                                  modalConfirm: false,
                                  modalAnime: false,
                                  isProgressAllList: true
                              });
                              remoteMyListAnime({state, dispatch}, state.animeReducer.idSelectAnime);
                          }
                          }
                          cancel={() => dispatch.setter('animeReducer', {modalConfirm: false})}/>

            <Modal isOpen={state.animeReducer.modalAnime}
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

                <ModalHeader toggle={() => dispatch.setter('animeReducer', {modalAnime: false})}>Информация о твоей
                    анимешке</ModalHeader>
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

                            <FormGroup row>
                                <Label for="name" sm={2}>Название</Label>
                                <Col sm={9}>
                                    <Input bsSize="sm" type="text" name="name" id="name" placeholder="Название анимешки"
                                           value={state.animeReducer.animeInfo.name}
                                           onChange={ (e) => dispatch.setter('animeReducer', { animeInfo: Object.assign(state.animeReducer.animeInfo, {name: e.target.value}) }) }
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="genre" sm={2}>Название</Label>
                                <Col sm={9}>
                                    <Input type="select" name="genre" id="genre"
                                           bsSize="sm" value={state.animeReducer.animeInfo.id_genre}
                                           onChange={ (e) => dispatch.setter('animeReducer', { animeInfo: Object.assign(state.animeReducer.animeInfo, {id_genre: e.target.value}) }) }>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </Input>
                                </Col>
                            </FormGroup>

                        </div>

                    </LoadingOverlay>

                </ModalBody>
                <ModalFooter>

                    <Button color="warning"
                            style={{left: '16px', position: 'absolute'}}
                            onClick={
                                () => {
                                    dispatch.setter('animeReducer', {modalConfirm: true});
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
                            onClick={() => dispatch.setter('animeReducer', {modalAnime: false})}
                            size="sm">
                        Закрыть
                    </Button>
                </ModalFooter>
            </Modal>

        </div>
    )

}

export default connector(ModalAnime);