import React, { useState } from 'react';
import { getBasePokemon, getItem, addPokemon, getSpecificPokemon, getLearnedMoves } from '../../axios/api';
import { BasePokemon, Item, Pokemon, Move } from '../../types/types';
import TextField from '@material-ui/core/TextField';
import AddPokemon from './AddPokemon';
import { Grid } from '@material-ui/core'

function UserIDSelect() {
    const [uid, setUid] = React.useState<number>(1);

    const handleInputChange = (e) => {
        setUid(e.target.value);
    };

    return (



<Grid
container
spacing={0}
direction="column"
alignItems="center"
justify="center"
style={{ minHeight: '100vh' }}
>

<Grid item xs={6}>
<div style={{width: '100%'}}> 
			<p>USER ID: {uid} </p>
            <button onClick={() => setUid(uid + 1)}>Click me</button>
            <br></br>
            <TextField name="name" label="User_ID" type="number" onChange={handleInputChange} value={uid} fullWidth/>
			<div>
			<AddPokemon user_id={uid}></AddPokemon>
			</div>
			</div>
</Grid>   

</Grid> 

    );
}
export default UserIDSelect;
