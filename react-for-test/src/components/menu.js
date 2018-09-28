import React from 'react';

import {connector} from "../store/utils/connector";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    NavbarBrand
} from 'reactstrap';

const Menu = ({state, dispatch}) =>
    (

        <Navbar color="light" light expand="md">
            <NavbarBrand href="#" onClick={() => { dispatch.changeMenuItem('') }}>Мои анимешки</NavbarBrand>
            <NavbarToggler onClick={() => dispatch.changeMenuCollapse(!state.menuReducer.collapse)} />
            <Collapse isOpen={state.menuReducer.collapse} navbar>
                <Nav className="ml-auto" navbar>

                    {
                        <NavItem>
                            <NavLink href="#" active={state.menuReducer.item === 'auth'}
                                     onClick={() => dispatch.changeMenuItem('auth')}>Авторизция</NavLink>
                        </NavItem>
                    }

                    {
                        <NavItem>
                            <NavLink href="#" active={state.menuReducer.item === 'reg'}
                                     onClick={() => dispatch.changeMenuItem('reg')}>Регистрация</NavLink>
                        </NavItem>
                    }

                    {
                        <NavItem>
                            <NavLink href="#" active={state.menuReducer.item === 'profile'}
                                     onClick={() => dispatch.changeMenuItem('profile')}>Мой профиль</NavLink>
                        </NavItem>
                    }

                    {
                        <NavItem>
                            <NavLink href="#" active={state.menuReducer.item === 'top100'}
                                     onClick={() => dispatch.changeMenuItem('top100')}>Топ 100</NavLink>
                        </NavItem>
                    }

                    {
                        <NavItem>
                            <NavLink href="#" active={state.menuReducer.item === 'myList'}
                                     onClick={() => dispatch.changeMenuItem('myList')}>Мой список</NavLink>
                        </NavItem>
                    }

                    {
                        <NavItem>
                            <NavLink href="#" active={state.menuReducer.item === 'list'}
                                     onClick={() => dispatch.changeMenuItem('list')}>Полный список</NavLink>
                        </NavItem>
                    }

                    {
                        <NavItem>
                            <NavLink href="#" onClick={() => {}}>Выход</NavLink>
                        </NavItem>
                    }

                </Nav>
            </Collapse>
        </Navbar>

    )

export default connector(Menu)