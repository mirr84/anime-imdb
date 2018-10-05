import React from 'react';
import {connector} from "../store/utils/connector";

import {Col, Button, FormGroup, Label, Input, Form} from 'reactstrap';

import {doReg} from "./../services/serviceAuth";

const Reg = ({state, dispatch}) => {

  return (
    <div>
        <Form onSubmit={(e) => { e.preventDefault(); doReg({state, dispatch});}}>

            <FormGroup row>
                <Label for="login" sm={2}>Логин</Label>
                <Col sm={10}>
                    <Input bsSize="sm" type="text" name="login" id="login" placeholder="Логин"
                           value={state.loginReducer.login}
                           onChange={
                               (e) => {
                                   dispatch.changeLoginInput(e.target.value)
                               }
                           }
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="password" sm={2}>Пароль</Label>
                <Col sm={10}>
                    <Input bsSize="sm" type="password" name="password" id="password" placeholder="Пароль"
                           value={state.loginReducer.password}
                           onChange={(e) => {
                               dispatch.changePasswordInput(e.target.value)
                           }}
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="email" sm={2}>email</Label>
                <Col sm={10}>
                    <Input bsSize="sm" type="email" name="email" id="email" placeholder="email"
                           value={state.loginReducer.email}
                           onChange={(e) => {
                               dispatch.changeEmailInput(e.target.value)
                           }}
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col sm={{size: 10, offset: 2}}>
                    <Button size="sm"
                            disabled={!state.loginReducer.login || !state.loginReducer.password || !state.loginReducer.email}>
                        Войти
                    </Button>
                </Col>
            </FormGroup>

        </Form>
    </div>
  )

}

export default connector(Reg)