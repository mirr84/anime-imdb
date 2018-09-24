import React, { Component } from 'react';

import Main from './components/main';
import Auth from './components/auth';
import Reg from './components/reg';
import Profile from './components/profile';
import Top100 from './components/top100';
import MyList from './components/myList';
import List from './components/list';

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
    this.state = { isOpen: false };
  }

  toggle() { this.setState({ isOpen: !this.state.isOpen }); }  
  selectSection (section) { localStorage.section = section; }

  render() {
    return (
      <div>
         <Navbar color="light" light expand="md">
          <NavbarBrand href="/" onClick={() => this.selectSection('main')}>Мои анимешки</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/" onClick={() => this.selectSection('auth')}>Авторизция</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/" onClick={() => this.selectSection('reg')}>Регистрация</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/" onClick={() => this.selectSection('profile')}>Мой профиль</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/" onClick={() => this.selectSection('top100')}>Тор 100</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/" onClick={() => this.selectSection('myList')}>Мой список</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/" onClick={() => this.selectSection('list')}>Полный список</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <br />

		<Container>
        
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
