import React from 'react';

import {connector} from "./store/utils/connector";
import lifecycle from 'react-pure-lifecycle';

import Menu from './components/menu';
import Main from './components/main';
import Auth from './components/auth';
import Reg from './components/reg';
import Profile from './components/profile';
import Top100 from './components/top100';
import MyList from './components/myList';
import List from './components/list';

import {ToastContainer, toast} from "react-toastify";
import { Container } from 'reactstrap';

const methods = {
    componentDidMount(props) {
    }
}

const App = ({state, dispatch}) => {

    return (
        <div>

            <ToastContainer autoClose={8000} position={toast.POSITION.TOP_RIGHT}/>

            <Menu />

            <br />

            <Container>

                { state.menuReducer.item === 'main' || !state.menuReducer.item ? <Main /> : '' }
                { state.menuReducer.item === 'auth' ? <Auth /> : '' }
                { state.menuReducer.item === 'reg' ? <Reg /> : '' }
                { state.menuReducer.item === 'profile' ? <Profile /> : '' }
                { state.menuReducer.item === 'top100' ? <Top100 /> : '' }
                { state.menuReducer.item === 'myList' ? <MyList /> : '' }
                { state.menuReducer.item === 'list' ? <List /> : '' }

            </Container>

        </div>
    );

}

export default connector(lifecycle(methods)(App));
