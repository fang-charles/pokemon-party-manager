import React, { Component, useState, useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Example from './components/Example';
import ExampleBoatView from './components/ExampleBoatView';
import ButtonAppBar from './components/ButtonAppBar';

import TestCharles from './test/TestCharles';
import TestLarry from './test/TestLarry';
import TestEldon from './test/TestEldon';
import TestJammie from './test/TestJammie';
import Login2 from './components/Login';
import Signup from './components/Signup';
import UserIDSelect from './components/addPokemon/UserIDSelect';
import AdminView from './components/adminView/AdminView';
import reducer from './reducer';

import { BrowserRouter as Router, Link, Redirect, withRouter } from 'react-router-dom';

type State = {
    username: string;
    password: string;
    isButtonDisabled: boolean;
    helperText: string;
    isError: boolean;
    loggedIn: boolean;
};

const initialState: State = {
    username: '',
    password: '',
    isButtonDisabled: true,
    helperText: '',
    isError: false,
    loggedIn: false,
};

export default function App() {
    const [reduxState, rdispatch] = useReducer(reducer, initialState);

    const fakeAuth = {
        isAuthenticated: false,
        authenticate() {
          console.log("auth called----");
            this.isAuthenticated = reduxState.loggedIn;

        },
        signout(cb) {
            this.isAuthenticated = false;
            setTimeout(cb, 100); // fake async
        },
    };

    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route
            {...rest}
            render={(props) =>
                fakeAuth.isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );

    const AuthButton = withRouter(({ history }) =>
        reduxState.loggedIn ? (
            <p>
                Welcome!{' '}
                <button
                    onClick={() => {
                        fakeAuth.signout(() => history.push('/'));
                    }}
                >
                    Sign out
                </button>
            </p>
        ) : (
            <p>You are not logged in.</p>
        ),
    );

    return (
        <Router>
            <div>
                <AuthButton />

                <Route
                    exact
                    path="/login"
                    component={() => <Login2 auth={fakeAuth.authenticate} />}
                />

                <Route exact path="/signup" component={Signup}></Route>
                <PrivateRoute exact path="/test/charles" component={TestCharles}></PrivateRoute>
                <PrivateRoute exact path="/test/larry" component={TestLarry}></PrivateRoute>
                <PrivateRoute exact path="/test/eldon" component={TestEldon}></PrivateRoute>
                <PrivateRoute exact path="/test/jammie" component={TestJammie}></PrivateRoute>

                <PrivateRoute exact path="/components/AddPokemon" component={UserIDSelect}></PrivateRoute>
                <PrivateRoute exact path="/components/AdminView" component={AdminView}></PrivateRoute>
            </div>
        </Router>
    );
}
