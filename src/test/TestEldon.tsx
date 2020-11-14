import React, { useState } from 'react';
import {
    getParty,
    getUser,
    getMove,
    getUserID,
    deleteParty,
    deletePokemon,
    loseItem,
    verifyPassword,
    createAccount,
} from '../axios/api';
import { Party, Pokemon, BasePokemon, User, Move, Item, Loginer } from '../types/types';
import TextField from '@material-ui/core/TextField';

function TestEldon() {
    // Declare a new state variable, which we'll call "count"
    let bulbasaur: BasePokemon = {
        pokedex_number: 1,
        name: 'Bulbasaur',
        type1: 'Grass',
        type2: 'Poison',
        hp: 45,
        attack: 49,
        defense: 49,
        special_attack: 65,
        special_defense: 65,
        speed: 45,
        sprite_data: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
    };
    let move1: Move = {
        move_name: 'jump',
        power: 40,
        accuracy: 100,
        type: 'poison',
        pp: 3,
        effect: 'jumps on top of jammie',
    };
    let poki1: Pokemon = {
        pkID: 4,
        nickname: 'Charlie',
        level: 5,
        moves: [move1],
        baseInfo: bulbasaur,
    };
    let party1: Party = {
        party_id: 12,
        member: [poki1],
    };
    let user1: User = {
        user_id: 5,
        username: 'Darwin',
    };
    let item1: Item = {
        item_name: 'string',
        item_description: 'string',
    };

    const [count, setCount] = useState(1);
    const [base, setBase] = useState<Party>(party1);
    const [partyDel, setPartyDel] = useState<Party>(party1);
    const [user, setUser] = useState<User>(user1);
    const [userName, setUserName] = useState<User>(user1);
    const [move, setMove] = useState<Move>(move1);
    const [pokeDel, setPokeDel] = useState<Pokemon>(poki1);
    const [itemDel, setItemDel] = useState<Item>(item1);

    React.useEffect(() => {
        getParty(count).then((res) => {
            setBase(res.data);
        });
    }, [count]);

    React.useEffect(() => {
        deleteParty(count).then((res) => {
            setPartyDel(res.data);
        });
    }, [count]);

    React.useEffect(() => {
        loseItem(15, 'absolite').then((res) => {
            setItemDel(res.data);
        });
    }, [count]);

    React.useEffect(() => {
        deletePokemon(11).then((res) => {
            setPokeDel(res.data);
        });
    }, [count]);

    React.useEffect(() => {
        getUser(count).then((res) => {
            setUser(res.data);
        });
    }, [count]);

    React.useEffect(() => {
        getUserID('yiff.li').then((res) => {
            setUserName(res.data);
        });
    }, [count]);

    React.useEffect(() => {
        getMove('after-you').then((res) => {
            setMove(res.data);
        });
    }, [count]);

    const handleInputChange = (e) => {
        setCount(e.target.value);
    };

    let login1: Loginer = {
        user: 'string',
        password: 'string',
    };

    const [test, setTest] = useState<Loginer>(login1);
    React.useEffect(() => {
        verifyPassword('larry.cai', 'i_love_cats').then((res) => {
            setTest(res.data);
        });
    }, [count]);

    const [test2, setTest2] = useState<Loginer>(login1);
    React.useEffect(() => {
        createAccount('jammie.wang3', 'rickeyguo<3').then((res) => {
            setTest2(res.data);
        });
    }, [count]);

    return (
        <div>
            Eldon's Testing Room
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <TextField name="name" label="Party Number" onChange={handleInputChange} value={count} />
            <p>{JSON.stringify(base)}</p>
            <p>{JSON.stringify(user)}</p>
            <p>{JSON.stringify(userName)}</p>
            <p>{JSON.stringify(move)}</p>
            <p>{JSON.stringify(partyDel)}</p>
            <p>{JSON.stringify(pokeDel)}</p>
            <p>{JSON.stringify(itemDel)}</p>
            <p>Password: {JSON.stringify(test)}</p>
            <p>Password: {JSON.stringify(test2)}</p>
        </div>
    );
}
export default TestEldon;
