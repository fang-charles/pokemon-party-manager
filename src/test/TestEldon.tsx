import React, { useState } from 'react';
import { getParty } from '../axios/api';
import { Party, Pokemon, BasePokemon } from '../types/types';
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

    let poki1: Pokemon = {
        pkID: 4,
        nickname: 'Charlie',
        level: 5,
        moves: [], 
        baseInfo: bulbasaur,
    };
    let party1: Party = {
        party_id: 1,
        member: [poki1], 
    };
    const [count, setCount] = useState(1);
    const [base, setBase] = useState<Party>(party1);

    React.useEffect(() => {
        getParty(count).then((res) => {
            setBase(res.data);
        });
    }, [count]);

    const handleInputChange = (e) => {
        setCount(e.target.value);
    };

    return (
        <div>
            Eldon's Testing Room
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <TextField name="name" label="Party Number" onChange={handleInputChange} value={count} />
            <p>{JSON.stringify(base)}</p>
        </div>
    );
}
export default TestEldon;
