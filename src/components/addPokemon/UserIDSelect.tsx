import React from 'react';
import TextField from '@material-ui/core/TextField';
import AddPokemon from './AddPokemon';
import { Grid } from '@material-ui/core';

function UserIDSelect() {
    const [pid, setPid] = React.useState<number>(1);

    const handleInputChangePid = (e) => {
        setPid(e.target.value);
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
            <Grid item xs={4}>
                <div style={{ width: '100%' }}>
                    <p>Party ID: {pid} </p>
                    <br></br>
                    <TextField
                        name="name"
                        label="Party_ID"
                        type="number"
                        onChange={handleInputChangePid}
                        value={pid}
                        fullWidth
                    />
                    <div>
                        <AddPokemon party_id={pid}></AddPokemon>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}
export default UserIDSelect;
