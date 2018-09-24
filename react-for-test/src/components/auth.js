import React, { Component } from 'react';

import axios from 'axios';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import NotificationAlert from 'react-notification-alert';
import md5 from 'md5';

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

    axios({
		    url: 'http://y913929d.beget.tech/auth/login',
		    method: 'post',
		    data: {
		    	login: this.state.login,
		    	password: md5(this.state.password)
		    }
		 })
		 .then(
        (response) => { 
          this.setState({menu: response.data});
        }
      ) 
     .catch(
        (error) => { 
          this.setState({menu: error.response.data});

                this.refs.notify.notificationAlert(
                {
                    place: 'br',
                    message: (
                        <div>
                            <span>
                                Ошибка логина или пароля
                            </span>
                        </div>
                    ),
                    type: "info",
                    icon: "",
                    autoDismiss: 5
                }
              );
          }        
      )

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
          <Label for="login" sm={2}>Email</Label>
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