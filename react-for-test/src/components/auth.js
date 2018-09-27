import React, { Component } from 'react';

import axios from 'axios';
import { Col, Button, FormGroup, Label, Input } from 'reactstrap';
import NotificationAlert from 'react-notification-alert';
import md5 from 'md5';
import {siteUrl} from "../common/config";

class  Auth extends React.Component {

  constructor(props) {
    super(props);
    this.state = { login: '', password: '' };
    
  	this.handleLoginChange = this.handleLoginChange.bind(this);
  	this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    // this.state.login
    // this.state.password

    event.preventDefault();
  }

  handleLoginChange(event) {
    this.setState({login: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

render() {
  return (
    <div>

	  <NotificationAlert ref="notify" />

      <form onSubmit={this.handleSubmit}>

      	<FormGroup row>
          <Label for="login" sm={2}>login</Label>
          <Col sm={10}>
            <Input bsSize="sm" type="text" name="login" id="login" placeholder="Логин" value={this.state.login} onChange={this.handleLoginChange} />
          </Col>
        </FormGroup>

      	<FormGroup row>
          <Label for="password" sm={2}>Password</Label>
          <Col sm={10}>
            <Input bsSize="sm" type="password" name="password" id="password" placeholder="Пароль"  value={this.state.password} onChange={this.handlePasswordChange}/>
          </Col>
        </FormGroup>

        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button  type="submit" bsSize="sm">Войти</Button>
          </Col>
        </FormGroup>

      </form>
    </div>
  )
}

}

export default Auth;