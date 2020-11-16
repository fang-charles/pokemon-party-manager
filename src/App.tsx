import React, { Component, useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import ButtonAppBar from './components/ButtonAppBar';

import TestCharles from './test/TestCharles';
import TestLarry from './test/TestLarry';
import TestEldon from './test/TestEldon';
import TestJammie from './test/TestJammie';
import Login from './components/Login';
import Signup from './components/Signup';
import UserIDSelect from './components/addPokemon/UserIDSelect';
import AdminView from './components/adminView/AdminView';

class App extends Component {
    render() {
        return (
            <>
                <ButtonAppBar />
                <Switch>
                    {' '}
                    {/* The Switch decides which component to show based on the current URL.*/}
                    <Route exact path="/" component={Login}></Route>
                    <Route exact path="/test/charles" component={TestCharles}></Route>
                    <Route exact path="/test/larry" component={TestLarry}></Route>
                    <Route exact path="/test/eldon" component={TestEldon}></Route>
                    <Route exact path="/test/jammie" component={TestJammie}></Route>
                    <Route exact path="/components/Login" component={Login}></Route>
                    <Route exact path="/components/Signup" component={Signup}></Route>
                    <Route exact path="/components/AddPokemon" component={UserIDSelect}></Route>
                    <Route exact path="/components/HomeView" component={AdminView}></Route>
                </Switch>
            </>
        );
    }
}

export default App;
