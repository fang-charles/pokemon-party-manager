import React, { useState } from 'react';
import {
    getBasePokemon,
    getItem,
    getParty,
    getUser,
    getMove,
    getUserID,
    deleteParty,
    deletePokemon,
    gainItem,
    addParty,
    learnMove,
    forgetMove,
} from '../axios/api';
import { BasePokemon, Item, Pokemon, Move, Party, User } from '../types/types';
import TextField from '@material-ui/core/TextField';
import PokemonCard from '../components/pokemonCard/PokemonCard';

function TestJammie() {
    // Declare a new state variable, which we'll call "count"
    //const [count, setCount] = useState(0);

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
        effect: 'jumps',
    };
    let move2: Move = {
        move_name: 'jump2',
        power: 40,
        accuracy: 100,
        type: 'poison',
        pp: 3,
        effect: 'jumps',
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
        user_id: 3,
        username: 'Charles',
        party: [],
    };

    let tackle: Move = {
        move_name: 'Tackle',
        power: 40,
        accuracy: 100,
        type: 'Normal',
        pp: 35,
        effect: 'Charges the foe with a full-body tackle.',
    };

    let acid: Move = {
        move_name: 'Acid',
        power: 40,
        accuracy: 100,
        type: 'Poison',
        pp: 30,
        effect: "Has a chance to lower the target's Special Defense",
    };

    const [count, setCount] = useState(1);
    const [base, setBase] = useState<Party>(party1);
    const [partyDel, setPartyDel] = useState<Party>(party1);
    const [move, setMove] = useState<Move>(move1);
    const [pokeDel, setPokeDel] = useState<Pokemon>(poki1);

    // Only recognizing the most passed to ------------- here
    const [moveLearned, setMoveLearned] = useState<Move>(move);
    React.useEffect(() => {
        learnMove(4, 'tackle', 'tackle', 'acid', 'acid');
    }, [count]);

    // not working!!!
    const [addingParty, setAddParty] = useState<Party>(party1);
    React.useEffect(() => {
        addParty(count).then((res) => {
            setAddParty(res.data);
        });
    }, [count]);

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
        deletePokemon(11).then((res) => {
            setPokeDel(res.data);
        });
    }, [count]);

    React.useEffect(() => {
        getMove('after-you').then((res) => {
            setMove(res.data);
            console.log(res.data);
        });
    }, [count]);

    const handleInputChange = (e) => {
        setCount(e.target.value);
    };

    return (
        <div>
            Jammie's Testing Room
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <TextField name="name" label="Party Number" onChange={handleInputChange} value={count} />
            <p>{JSON.stringify(moveLearned)}</p>
        </div>
    );
}
export default TestJammie;
