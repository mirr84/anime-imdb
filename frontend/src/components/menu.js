import React from 'react';

import {connector} from "../store/utils/connector";

import {FaUser, FaTable, FaUserSecret} from 'react-icons/fa';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import {checkLogin} from "../services/serviceAuth";

export const goToSection = (props, section) => {
    if (!section) {
        props.dispatch.setter('menuReducer', { item: ''  })
    } else {
        checkLogin(props)
            .then (
                (menu) => props.dispatch.setter('menuReducer', {menu})
            )
            .then(
                (result) => {
                    if (props.state.menuReducer.menu[section]) {
                        props.dispatch.setter('menuReducer', { item: section  })
                    } else {
                        // ничего не делаем
                    }
                }
            )
    }
}

const Menu = ({state, dispatch}) =>
    (

<SideNav
    onSelect={(selected) => {
        // Add your code here
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav>
        <NavItem eventKey="auth">
            <NavIcon>
                <FaUser />
            </NavIcon>
            <NavText>
                Авторизция
            </NavText>
            {
                state.menuReducer.menu.login ?
                    <NavItem eventKey="auth/auth"
                             onClick={() => goToSection({state, dispatch}, 'login')}
                             active={state.menuReducer.item === 'login'}>
                        <NavText>
                            Войти
                        </NavText>
                    </NavItem>
                    : ''
            }
            {
                state.menuReducer.menu.reg ?
                    <NavItem eventKey="auth/reg"
                             onClick={() => goToSection({state, dispatch}, 'reg')}
                             active={state.menuReducer.item === 'reg'}>
                        <NavText>
                            Регистрация
                        </NavText>
                    </NavItem> : ''
            }
            {
                state.menuReducer.menu.profile ?
                    <NavItem eventKey="auth/profile"
                             onClick={() => goToSection({state, dispatch}, 'profile')}
                             active={state.menuReducer.item === 'profile'}>
                        <NavText>
                            Мой профиль
                        </NavText>
                    </NavItem> : ''
            }
            {
                state.loginReducer.isAuth ?
                    <NavItem eventKey="auth/exit"
                             onClick={() => {
                                 alert('пока выход не работает, бугага =)');
                             }}
                             >
                        <NavText>
                           Выход
                        </NavText>
                    </NavItem> : ''
            }
        </NavItem>
        <NavItem eventKey="lists">
            <NavIcon>
                <FaTable />
            </NavIcon>
            <NavText>
                Таблицы
            </NavText>
            {
                state.menuReducer.menu.top100 ?
                    <NavItem eventKey="lists/top100"
                             onClick={() => goToSection({state, dispatch}, 'top100')}
                             active={state.menuReducer.item === 'top100'}>
                        <NavText>
                            Топ 100
                        </NavText>
                    </NavItem>
                    : ''
            }
            {
                state.menuReducer.menu.list ?
                    <NavItem eventKey="lists/list"
                             onClick={() => goToSection({state, dispatch}, 'list')}
                             active={state.menuReducer.item === 'list'}>
                        <NavText>
                            Полный список
                        </NavText>
                    </NavItem> : ''
            }
        </NavItem>
        <NavItem eventKey="lists">
            <NavIcon>
                <FaUserSecret />
            </NavIcon>
            <NavText>
                Мои списки
            </NavText>
            {
                state.menuReducer.menu.my_list ?
                    <NavItem eventKey="lists/my_list"
                             onClick={() => goToSection({state, dispatch}, 'my_list')}
                             active={state.menuReducer.item === 'my_list'}>
                        <NavText>
                           Мои выбранные
                        </NavText>
                    </NavItem>
                    : ''
            }
        </NavItem>

    </SideNav.Nav>
</SideNav>

    )

export default connector(Menu)