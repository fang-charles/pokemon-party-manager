import React, { useState } from 'react';
import { getBasePokemon, getItem, addPokemon, getSpecificPokemon, getLearnedMoves } from '../axios/api';
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
    }, []);

    React.useEffect(() => {
        getBasePokemon(count).then((res) => {
            setBase(res.data);
        });
    }, [count]);

    React.useEffect(() => {
        setPkmn({ ...pkmn, baseInfo: base });
    }, [base]);

    React.useEffect(() => {
        getItem('poke-ball').then((res) => {
            setItem(res.data);
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

    const [pkmn, setPkmn] = useState<Pokemon>(myBulbasaur);

    function handleSetPokemon(pkmn: Pokemon) {
        setPkmn(pkmn);
    }

    React.useEffect(() => {
        getSpecificPokemon(1).then((res) => {
            console.log(res.data);
            //setPkmn(res.data);
        });
    }, []);

    function makeImage(sprite: string) {
        return <img src={sprite} className="photo"></img>;
    }

    let arr: number[] = [1, 2, 3];
    function makeButton(num: number) {
        return (
            <>
                <TextField name="name" label={'Party:' + num} type="number" value={num} />
                <br></br>
            </>
        );
    }

    function genParty(num: number) {
        const items = [];
        for (let i = 0; i < num; i++) {
            items.push(
                <>
                    <button onClick={() => setCount(count + 1)}>Generate Party</button>
                    <br></br>
                </>,
            );
        }
        return items;
    }

    return (
        <div>
            Charles's Testing Room
            {makeImage('https://img.pokemondb.net/artwork/bulbasaur.jpg')}
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <br></br>
            <TextField name="name" label="PK_ID" type="number" onChange={handleInputChange} value={count} />
            <PokemonCard pk_id={count}> </PokemonCard>
            {arr.map((num) => makeButton(num))}
            {genParty(4 - arr.length)}
        </div>
    );
}
export default TestCharles;
