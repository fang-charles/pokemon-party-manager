import React, { useState } from 'react';
import { getBasePokemon, getItem } from '../axios/api';
import { BasePokemon, Item } from '../types/types';
import TextField from '@material-ui/core/TextField';

function TestCharles() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState<number>(1);
    const [base, setBase] = useState<BasePokemon>();
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

    return (
        <div>
            Charles's Testing Room
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <br></br>
            <TextField name="name" label="Pokedex Number" onChange={handleInputChange} value={count} />
            <p>{JSON.stringify(base)}</p>
        </div>
    );
}
export default TestCharles;
