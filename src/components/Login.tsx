import React, { useReducer, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

import { verifyPassword, getPartyGivenUsername } from '../axios/api';
import { Link } from 'react-router-dom';
import PartySelectScreen from './PartySelectScreen/PartySelectScreen';
import { Divider } from '@material-ui/core';
import { partyID } from '../types/types';
import reducer from '../reducer';

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

interface WelcomeProps {
    auth: () => void
}


const Login: React.FC<WelcomeProps> = (props) => {
    let auth = props.auth;
    const [state, dispatch] = useReducer(reducer, initialState);
    const classes = useStyles();

    //sets button to only enable if something is typed
    useEffect(() => {
        if (state.username.trim() && state.password.trim()) {
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
    }, [state.username, state.password]);

    const handleLogin = () => {
        //need to check with database
        //JSON.stringify(itemDel)
        verifyPassword(state.username, state.password).then((res) => {
            //pw = res.data;
            //pass = pw.password;

            //loginFailed
            if (!res.data) {
                dispatch({
                    type: 'loginFailed',
                    payload: 'Incorrect password!',
                });

                //SUCCESS
            } else {
                dispatch({
                    type: 'loginSuccess',
                    payload: 'Login Successfully',
                });
                
            }
        }).then(()=>auth());
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handleLogin();
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

    //let partyArr: any[] = [];
    const [partyArr, setPartyArr] = React.useState<partyID[]>([]);
    React.useEffect(() => {
        getPartyGivenUsername(state.username).then((res) => {
            setPartyArr(res.data);
        });
    }, [state.username]);
    /*     getPartyGivenUsername(state.username).then((res) => {
        React.useEffect(() =>)
        partyArr = res.data;

    }); */


    console.log("-------------------------------------------")
    if (state.loggedIn) {
        return (
            <div>
                {partyArr.map((num) => makeParty(num.party_id))}
                {genParty(4 - partyArr.length)}
            </div>
        );
    } else {
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <Card className={classes.card}>
                    <CardHeader className={classes.header} title="Login to play Pokemon!" />
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
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            className={classes.loginBtn}
                            onClick={handleLogin}
                            disabled={state.isButtonDisabled}
                        >
                            Login
                        </Button>
                    </CardActions>
                    <CardActions>
                        <Link to="/components/Signup">
                            <Button variant="contained" size="large" color="secondary" className={classes.loginBtn}>
                                Sign up!
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </form>
        );
    }
};

export default Login;
