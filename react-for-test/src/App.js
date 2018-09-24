import React, { Component } from 'react';

import Main from './components/main';
import Auth from './components/auth';
import Reg from './components/reg';
import Profile from './components/profile';
import Top100 from './components/top100';
import MyList from './components/myList';
import List from './components/list';

import NotificationAlert from 'react-notification-alert';
import axios from 'axios';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Container } from 'reactstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.selectSection = this.selectSection.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.state = { isOpen: false };
  }

  toggle() { this.setState({ isOpen: !this.state.isOpen }); }  
  selectSection (section) { localStorage.section = section; }

	 myFunc() {
	 	this.refs.notify.notificationAlert(
	 		{
			    place: 'br',
			    message: (
			        <div>
			            <div>
			                Welcome to Now UI Dashboard React
			            </div>
			        </div>
			    ),
			    type: "info",
			    icon: "",
			    autoDismiss: 5
			}
	 	);
	 }

	 checkAuth = () => {
	 	this.myFunc();
	 }

  componentDidMount() {

		axios({
		    url: 'http://y913929d.beget.tech/auth/check',
		    method: 'get',
		    headers: {
		        'token': 'test'
		    }
		 })
		 .then(response => {
		    console.log(response)
		 }) 
		 .catch(err => {
		    console.log(err);
		 });

  }

  render() {

    return (
      <div>

      	<NotificationAlert ref="notify" />

         <Navbar color="light" light expand="md">
          <NavbarBrand href="/" onClick={() => this.selectSection('main')}>Мои анимешки</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/" active={localStorage.section === 'auth'} onClick={() => this.selectSection('auth')}>Авторизция</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/" active={localStorage.section === 'reg'}  onClick={() => this.selectSection('reg')}>Регистрация</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/" active={localStorage.section === 'profile'} onClick={() => this.selectSection('profile')}>Мой профиль</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/" active={localStorage.section === 'top100'} onClick={() => this.selectSection('top100')}>Тор 100</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/" active={localStorage.section === 'myList'} onClick={() => this.selectSection('myList')}>Мой список</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/" active={localStorage.section === 'list'} onClick={() => this.selectSection('list')}>Полный список</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <br />

		<Container>
		
        	<button onClick={() => this.myFunc()}>Hey</button>
        
        	{ localStorage.section === 'main' || !localStorage.section ? <Main /> : '' }
        	{ localStorage.section === 'auth' ? <Auth /> : '' }	
			{ localStorage.section === 'reg' ? <Reg /> : '' }	
			{ localStorage.section === 'profile' ? <Profile /> : '' }	
			{ localStorage.section === 'top100' ? <Top100 /> : '' }
			{ localStorage.section === 'myList' ? <MyList /> : '' }
			{ localStorage.section === 'list' ? <List /> : '' }

      	</Container>

      </div>
    );
  }
}

export default App;
