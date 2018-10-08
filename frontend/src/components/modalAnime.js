import React from 'react';
import {connector} from "../store/utils/connector";

import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Col, Input, FormGroup, Label} from "reactstrap";
import LoadingOverlay from "react-loading-overlay";
import {autocompleteGenre, infoMyListAnime, remoteMyListAnime} from "../services/serviceAnime";

import ModalConfirm from './modalConfirm';
import lifecycle from "react-pure-lifecycle";

import Viewer from 'react-viewer';

const methods = {
    componentDidMount(props) {
        autocompleteGenre(props, '')
            .then(
                (genreList) =>  props.dispatch.setter('animeReducer', {genreList})
            )
    }
}

const ModalAnime = ({state, dispatch}) => {

    return (
        <div>

            <Viewer
                zIndex={10000}
                noNavbar={true}
                visible={state.animeReducer.imageShow}
                onClose={() => dispatch.setter('animeReducer', { imageShow : false }) }
                images={[{src: state.animeReducer.animeInfo.url_image, alt: state.animeReducer.animeInfo.name}]}
            />

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
                            {/*{*/}
                                {/*JSON.stringify(state.animeReducer.animeInfo)*/}
                            {/*}*/}

                            <FormGroup row>

                                <Label for="nameAnime" sm={2}>Название</Label>
                                <Col sm={10}>
                                    <Input bsSize="sm" type="text" name="nameAnime" id="nameAnime" placeholder="Название анимешки"
                                           value={state.animeReducer.animeInfo.name}
                                           onChange={ (e) => dispatch.setter('animeReducer', { animeInfo: Object.assign(state.animeReducer.animeInfo, {name: e.target.value}) }) }
                                    />
                                </Col>
                                <Label for="genre" sm={2}>Жанр</Label>
                                <Col sm={10}>
                                    <Input type="select" name="genre" id="genre"
                                           bsSize="sm" value={state.animeReducer.animeInfo.id_genre}
                                           onChange={ (e) => dispatch.setter('animeReducer', { animeInfo: Object.assign(state.animeReducer.animeInfo, {id_genre: e.target.value}) }) }>
                                        {
                                            state.animeReducer.genreList
                                                .map(
                                                    (item, idx) => <option key={idx} value={item.id}>{item.name}</option>
                                                )
                                        }
                                    </Input>
                                </Col>
                                <Label for="description" sm={2}>Описание</Label>
                                <Col sm={10}>
                                    <Input type="textarea" name="description" id="description"
                                           style={ {marginBottom: '7px'} }
                                           bsSize="sm"
                                           value={state.animeReducer.animeInfo.description}
                                           onChange={ (e) => dispatch.setter('animeReducer', { animeInfo: Object.assign(state.animeReducer.animeInfo, {description: e.target.value}) }) }>
                                    </Input>
                                </Col>
                                <Label for="col_season" sm={2}>Кол. сезонов</Label>
                                <Col sm={2}>
                                    <Input type="select" name="col_season" id="col_season"
                                           bsSize="sm" value={state.animeReducer.animeInfo.col_season}
                                           onChange={ (e) => dispatch.setter('animeReducer', { animeInfo: Object.assign(state.animeReducer.animeInfo, {col_season: e.target.value}) }) }>
                                        {
                                            Array.apply(null, {length: 20}).map(Number.call, Number)
                                                .map(
                                                    (item, idx) => <option key={idx} value={item+1}>{item+1}</option>
                                                )
                                        }
                                    </Input>
                                </Col>
                                <Label for="col_part" sm={2}>Кол. серий</Label>
                                <Col sm={2}>
                                    <Input type="select" name="col_part" id="col_part"
                                           bsSize="sm" value={state.animeReducer.animeInfo.col_part}
                                           onChange={ (e) => dispatch.setter('animeReducer', { animeInfo: Object.assign(state.animeReducer.animeInfo, {col_part: e.target.value}) }) }>
                                        {
                                            Array.apply(null, {length: 2000}).map(Number.call, Number)
                                                .map(
                                                    (item, idx) => <option key={idx} value={item+1}>{item+1}</option>
                                                )
                                        }
                                    </Input>
                                </Col>
                                <Col sm={4} />

                                {/**/}

                                {
                                    state.animeReducer.animeInfo.url_image ?
                                        <Col sm={2}>
                                            <Button style={ {paddingLeft: '0px'} }
                                                    color="link"
                                                    onClick={ () => dispatch.setter('animeReducer', { imageShow : true }) }>
                                                Картинка
                                            </Button>
                                        </Col>
                                        :
                                        <Label for="imageAnime" sm={2}>Картинка</Label>
                                }
                                <Col sm={10}>
                                    <Input bsSize="sm" type="text" name="imageAnime" id="imageAnime" placeholder="ссылка на картинку"
                                           value={state.animeReducer.animeInfo.url_image}
                                           onChange={ (e) => dispatch.setter('animeReducer', { animeInfo: Object.assign(state.animeReducer.animeInfo, {url_image: e.target.value}) }) }
                                    />
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

export default connector(lifecycle(methods)(ModalAnime));