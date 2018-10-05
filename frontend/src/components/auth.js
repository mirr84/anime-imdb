import React from 'react';
import {connector} from "../store/utils/connector";

import {Col, Button, FormGroup, Label, Input, Form} from 'reactstrap';
import {doLogin} from "./../services/serviceAuth";

const Auth = ({state, dispatch}) => {

    return (
        <div>

            <Form onSubmit={(e) => { e.preventDefault(); doLogin({state, dispatch}); }}>

                <FormGroup row>
                    <Label for="login" sm={2}>Логин</Label>
                    <Col sm={10}>
                        <Input bsSize="sm" type="text" name="login" id="login" placeholder="Логин"
                               value={state.loginReducer.login}
                               onChange={ (e) => dispatch.setter('loginReducer', {login: e.target.value}) }
                        />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="password" sm={2}>Пароль</Label>
                    <Col sm={10}>
                        <Input bsSize="sm" type="password" name="password" id="password" placeholder="Пароль"
                               value={state.loginReducer.password}
                               onChange={ (e) => dispatch.setter('loginReducer', {password: e.target.value}) }
                        />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Col sm={{size: 10, offset: 2}}>
                        <Button size="sm"
                                disabled={!state.loginReducer.login || !state.loginReducer.password}>
                            Войти
                        </Button>
                    </Col>
                </FormGroup>

            </Form>

        </div>
    )

}

export default connector(Auth)