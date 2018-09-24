import React, { Component } from 'react';

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
    this.state = { isOpen: false };
  };

  toggle() { this.setState({ isOpen: !this.state.isOpen }); }



  render() {
    return (
      <div>
         <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Мои анимешки</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Авторизция</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Регистрация</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Мой профиль</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Тор 100</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Мой список</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Полный список</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <br />

		<Container>
        <Table size="sm" striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
      </Container>

      </div>
    );
  }
}

export default App;
