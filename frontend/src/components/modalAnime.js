import React from 'react';
import {connector} from "../store/utils/connector";

import lifecycle from "react-pure-lifecycle";

import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import LoadingOverlay from "react-loading-overlay";


const methods = {
    componentDidMount(props) {
    }
}

const ModalAnime = ({state, dispatch}) => {

    return (
        <div>

            <Modal isOpen={state.animeReducer.modalAnime} toggle={ () => {} } size={'lg'}>
                <ModalHeader toggle={() => dispatch.setter('animeReducer', { modalAnime: false  }) }>Информация о твоей анимешке</ModalHeader>
                <ModalBody>

                    <LoadingOverlay
                        active={true}
                        background={'#f0f8ffbd'}
                        color={'black'}
                        spinner
                        text='Получаем данные по выбранной анимешке'
                    >
                        { state.animeReducer.idSelectAnime }

                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci cumque, eaque labore
                            magnam quaerat veniam? Est ipsum molestias nobis quibusdam quidem reiciendis similique.
                            Autem explicabo iste molestiae similique veritatis.
                        </div>
                        <div>Consequatur magnam officiis sed ullam voluptatibus! Ad, alias autem cum debitis dolor
                            doloribus ducimus eligendi esse ex expedita explicabo fuga necessitatibus numquam officiis
                            quis temporibus vel voluptates. Aspernatur, porro, veritatis?
                        </div>
                        <div>Beatae blanditiis est fuga ipsam ipsum numquam totam ut vel voluptas! Aperiam architecto
                            beatae consectetur distinctio, ea ex incidunt iste placeat praesentium, quae quam ratione
                            repellat tempora, tenetur ullam voluptate.
                        </div>

                    </LoadingOverlay>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary"
                            disabled={true}
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

export default connector(lifecycle(methods)(ModalAnime));