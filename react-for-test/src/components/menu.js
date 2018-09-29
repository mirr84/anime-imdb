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

import {checkLogin} from "../services/serviceAuth";

const goToSection = (props, section) => {
    if (!section) {
        props.dispatch.changeMenuItem('');
    } else {
        checkLogin(props)
            .then(
                (result) => {
                    if (props.state.menuReducer.menu[section]) {
                        props.dispatch.changeMenuItem(section);
                    } else {
                        // ничего не делаем
                    }
                }
            )
    }
}

const Menu = ({state, dispatch}) =>
    (

        <Navbar color="light" light expand="md">
            <NavbarBrand href="#" onClick={() => goToSection({state, dispatch}, '')}>Мои анимешки</NavbarBrand>
            <NavbarToggler onClick={() => dispatch.changeMenuCollapse(!state.menuReducer.collapse)}/>
            <Collapse isOpen={state.menuReducer.collapse} navbar>
                <Nav className="ml-auto" navbar>

                    {
                        state.menuReducer.menu.login ?
                            <NavItem>
                                <NavLink href="#" active={state.menuReducer.item === 'login'}
                                         onClick={() => goToSection({state, dispatch}, 'login')}>Авторизция</NavLink>
                            </NavItem> : ''
                    }

                    {
                        state.menuReducer.menu.reg ?
                            <NavItem>
                                <NavLink href="#" active={state.menuReducer.item === 'reg'}
                                         onClick={() => goToSection({state, dispatch}, 'reg')}>Регистрация</NavLink>
                            </NavItem> : ''
                    }

                    {
                        state.menuReducer.menu.profile ?
                            <NavItem>
                                <NavLink href="#" active={state.menuReducer.item === 'profile'}
                                         onClick={() => goToSection({state, dispatch}, 'profile')}>Мой профиль</NavLink>
                            </NavItem> : ''
                    }

                    {
                        state.menuReducer.menu.top100 ?
                            <NavItem>
                                <NavLink href="#" active={state.menuReducer.item === 'top100'}
                                         onClick={() => goToSection({state, dispatch}, 'top100')}>Топ 100</NavLink>
                            </NavItem> : ''
                    }

                    {
                        state.menuReducer.menu.my_list ?
                            <NavItem>
                                <NavLink href="#" active={state.menuReducer.item === 'my_list'}
                                         onClick={() => goToSection({state, dispatch}, 'my_list')}>Мой список</NavLink>
                            </NavItem> : ''
                    }

                    {
                        state.menuReducer.menu.list ?
                            <NavItem>
                                <NavLink href="#" active={state.menuReducer.item === 'list'}
                                         onClick={() => goToSection({state, dispatch}, 'list')}>Полный список</NavLink>
                            </NavItem> : ''
                    }

                    {
                        state.loginReducer.isAuth ?
                            <NavItem>
                                <NavLink href="#" onClick={() => {
                                }}>Выход</NavLink>
                            </NavItem> : ''
                    }

                </Nav>
            </Collapse>
        </Navbar>

    )

export default connector(Menu)