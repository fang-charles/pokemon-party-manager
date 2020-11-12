import React, { useState } from 'react';
import { getBasePokemon, getItem } from '../axios/api';
import { BasePokemon, Item, Pokemon, Move } from '../types/types';
import TextField from '@material-ui/core/TextField';
import PokemonCard from '../components/pokemonCard/PokemonCard';

function TestCharles() {
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

    const [count, setCount] = useState<number>(1);
    const [base, setBase] = useState<BasePokemon>(bulbasaur);
    const [item, setItem] = useState<Item>();

    React.useEffect(() => {
        getBasePokemon(count).then((res) => {
            setBase(res.data);
        });
    }, [count]);

    React.useEffect(() => {
        getItem('poke-ball').then((res) => {
            setItem(res.data);
            console.log(res.data);
        });
    }, [count]);

    const handleInputChange = (e) => {
        setCount(e.target.value);
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

    let airMail: Item = {
        item_name: 'air-mail',
        item_description: 'placeholder desc',
    };

    let myBulbasaur: Pokemon = {
        pkID: 9,
        nickname: 'Whipper',
        level: 100,
        moves: [tackle, acid],
        baseInfo: base,
        holding: airMail,
    };

    return (
        <div>
            Charles's Testing Room
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <br></br>
            <TextField name="name" label="Pokedex Number" onChange={handleInputChange} value={count} />
            <p>{JSON.stringify(base)}</p>
            <PokemonCard pkmn={myBulbasaur}> </PokemonCard>
        </div>
    );
}
export default TestCharles;
