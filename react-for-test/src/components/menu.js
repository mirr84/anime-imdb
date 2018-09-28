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

//

const goToSection = (props, section) => {
    checkLogin(props)
        .then (
            (result) => {
                console.log(props.state.menuReducer);
                props.dispatch.changeMenuItem(section);
            }
        )
}

const Menu = ({state, dispatch}) =>
    (

        <Navbar color="light" light expand="md">
            <NavbarBrand href="#" onClick={() => goToSection({state, dispatch}, '') }>Мои анимешки</NavbarBrand>
            <NavbarToggler onClick={() => dispatch.changeMenuCollapse(!state.menuReducer.collapse)} />
            <Collapse isOpen={state.menuReducer.collapse} navbar>
                <Nav className="ml-auto" navbar>

                    {
                        <NavItem>
                            <NavLink href="#" active={state.menuReducer.item === 'auth'}
                                     onClick={() => goToSection({state, dispatch}, 'auth') }>Авторизция</NavLink>
                        </NavItem>
                    }

                    {
                        <NavItem>
                            <NavLink href="#" active={state.menuReducer.item === 'reg'}
                                     onClick={() => goToSection({state, dispatch}, 'reg') }>Регистрация</NavLink>
                        </NavItem>
                    }

                    {
                        <NavItem>
                            <NavLink href="#" active={state.menuReducer.item === 'profile'}
                                     onClick={() => goToSection({state, dispatch}, 'profile') }>Мой профиль</NavLink>
                        </NavItem>
                    }

                    {
                        <NavItem>
                            <NavLink href="#" active={state.menuReducer.item === 'top100'}
                                     onClick={() => goToSection({state, dispatch}, 'top100') }>Топ 100</NavLink>
                        </NavItem>
                    }

                    {
                        <NavItem>
                            <NavLink href="#" active={state.menuReducer.item === 'myList'}
                                     onClick={() => goToSection({state, dispatch}, 'myList') }>Мой список</NavLink>
                        </NavItem>
                    }

                    {
                        <NavItem>
                            <NavLink href="#" active={state.menuReducer.item === 'list'}
                                     onClick={() => goToSection({state, dispatch}, 'list') }>Полный список</NavLink>
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