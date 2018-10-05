import React from 'react';
import {connector} from "../store/utils/connector";

import lifecycle from "react-pure-lifecycle";

import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";


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

                    { state.animeReducer.idSelectAnime }

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => alert('3')}>Внести изменение</Button>{' '}
                    <Button color="secondary" onClick={() => dispatch.setter('animeReducer', { modalAnime: false  }) }>Закрыть</Button>
                </ModalFooter>
            </Modal>

        </div>
    )

}

export default connector(lifecycle(methods)(ModalAnime));