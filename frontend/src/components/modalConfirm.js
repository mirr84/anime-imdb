import React from 'react';
import {connector} from "../store/utils/connector";

import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const ModalConfirm = ({state, isOpen, text, success, cancel}) => {

    return (
        <div>

            <Modal isOpen={state.animeReducer.modalConfirm}
                   toggle={ () => {} }
                   size={'sm'}
            >
                <ModalHeader toggle={() => cancel()}>Подтвердить</ModalHeader>
                <ModalBody>

                    {
                        text
                    }

                </ModalBody>
                <ModalFooter>

                    <Button color="primary"
                            onClick={() => success()}
                            size="sm">
                        Да
                    </Button>{' '}
                    <Button color="secondary"
                            onClick={() => cancel()}
                            size="sm">
                        Нет
                    </Button>

                </ModalFooter>
            </Modal>

        </div>
    )

}

export default connector(ModalConfirm);