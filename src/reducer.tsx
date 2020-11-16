import React, { useReducer, useEffect, useState } from 'react';

//state type

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

type Action =
    | { type: 'setUsername'; payload: string }
    | { type: 'setPassword'; payload: string }
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
export default reducer;
