import React, { useReducer, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

import { createAccount, getPartyGivenUsername } from '../axios/api';
import { Loginer } from '../types/types';
import PartySelectScreen from './PartySelectScreen/PartySelectScreen';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 400,
            margin: `${theme.spacing(0)} auto`,
        },
        loginBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1,
        },
        header: {
            textAlign: 'center',
            background: '#212121',
            color: '#fff',
        },
        card: {
            marginTop: theme.spacing(10),
        },
    }),
);

//state type

type State = {
    username: string;
    password: string;
    confirm: string;
    isButtonDisabled: boolean;
    helperText: string;
    isError: boolean;
    loggedIn: boolean;
};

const initialState: State = {
    username: '',
    password: '',
    confirm: '',
    isButtonDisabled: true,
    helperText: '',
    isError: false,
    loggedIn: false,
};

type Action =
    | { type: 'setUsername'; payload: string }
    | { type: 'setPassword'; payload: string }
    | { type: 'setConfirmPassword'; payload: string }
    | { type: 'setIsButtonDisabled'; payload: boolean }
    | { type: 'loginSuccess'; payload: string }
    | { type: 'loginFailed'; payload: string }
    | { type: 'setIsError'; payload: boolean };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setUsername':
            return {
                ...state,
                username: action.payload,
            };
        case 'setPassword':
            return {
                ...state,
                password: action.payload,
            };
        case 'setConfirmPassword':
            return {
                ...state,
                confirm: action.payload,
            };
        case 'setIsButtonDisabled':
            return {
                ...state,
                isButtonDisabled: action.payload,
            };
        case 'loginSuccess':
            return {
                ...state,
                helperText: action.payload,
                isError: false,
                loggedIn: true,
            };
        case 'loginFailed':
            return {
                ...state,
                helperText: action.payload,
                isError: true,
            };
        case 'setIsError':
            return {
                ...state,
                isError: action.payload,
            };
    }
};

const Login = () => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);

    //sets button to only enable if something is typed
    useEffect(() => {
        if (state.username.trim() && state.password.trim() && state.confirm.trim()) {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: false,
            });
        } else {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: true,
            });
        }
    }, [state.username, state.password, state.confirm]);

    const handleSignup = () => {
        //need to check with database
        //JSON.stringify(itemDel)
        let pw: Loginer = {
            user: 'cats',
            password: 'string',
        };
        let pass: String = '';
        if (state.password != state.confirm) {
            dispatch({
                type: 'loginFailed',
                payload: "Passwords don't match",
            });
        } else {
            createAccount(state.username, state.password).then((res) => {
                console.log(res);
                if (res.data) {
                    dispatch({
                        type: 'loginSuccess',
                        payload: 'Sign Up Successful',
                    });
                } else {
                    dispatch({
                        type: 'loginFailed',
                        payload: 'Account already exists! Try logging in instead.',
                    });
                }
            });
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handleSignup();
        }
    };

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setUsername',
            payload: event.target.value,
        });
    };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setPassword',
            payload: event.target.value,
        });
    };

    const handleConfirmPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setConfirmPassword',
            payload: event.target.value,
        });
    };

    function makeParty(num: number) {
        return (
            <>
                <PartySelectScreen partyID={num}></PartySelectScreen>
                <br></br>
            </>
        );
    }

    function genParty(num: number) {
        return <a>Placeholder for genParty</a>;
    }

    let partyArr: any[] = [];
    getPartyGivenUsername(state.username).then((res) => {
        partyArr = res.data;
        if (state.loggedIn) {
            return (
                <div>
                    {partyArr.map((num) => makeParty(num))}
                    {genParty(4 - partyArr.length)}
                </div>
            );
        }
    });

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <Card className={classes.card}>
                <CardHeader className={classes.header} title="Sign up to play Pokemon!" />
                <CardContent>
                    <div>
                        <TextField
                            error={state.isError}
                            fullWidth
                            id="username"
                            type="email"
                            label="Username"
                            placeholder="Username"
                            margin="normal"
                            onChange={handleUsernameChange}
                            onKeyPress={handleKeyPress}
                        />
                        <TextField
                            error={state.isError}
                            fullWidth
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="Password"
                            margin="normal"
                            helperText={state.helperText}
                            onChange={handlePasswordChange}
                            onKeyPress={handleKeyPress}
                        />
                        <TextField
                            error={state.isError}
                            fullWidth
                            id="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            margin="normal"
                            helperText={state.helperText}
                            onChange={handleConfirmPasswordChange}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        className={classes.loginBtn}
                        onClick={handleSignup}
                        disabled={state.isButtonDisabled}
                    >
                        Sign up!
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};

export default Login;
