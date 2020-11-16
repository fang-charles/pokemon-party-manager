import React, { useState } from 'react';
import { getBasePokemon, getItem, addPokemon, getSpecificPokemon, getLearnedMoves } from '../../axios/api';
import { BasePokemon, Item, Pokemon, Move } from '../../types/types';
import TextField from '@material-ui/core/TextField';
import PokemonCard from '../pokemonCard/PokemonCard';
import PartySelectScreen from '../PartySelectScreen/PartySelectScreen';
import PartyScreen from '../PartyScreen/PartyScreen';
import AddParty from '../PartySelectScreen/AddParty';
import { Grid } from '@material-ui/core';

function AdminView() {
		const [userId, setUserId] = React.useState<number>(1);
		const [partyId, setPartyId] = React.useState<number>(1);

        const handleInputChangeUserId = (e) => {
			setUserId(e.target.value);
		};
        const handleInputChangePartyId = (e) => {
			setPartyId(e.target.value);
		};
		
    return (
        <Grid container spacing={3} justify="center">
			<Grid xs={3}>
			<h1>Admin</h1>
				<h5>User ID: {userId}</h5>
				<TextField name="name" label="User ID" type="number" onChange={handleInputChangeUserId} value={userId} />
				<h5>Party ID: {partyId}</h5>
				<TextField name="name" label="Party ID" type="number" onChange={handleInputChangePartyId} value={partyId} />
			</Grid>
            <Grid item xs={3}>

				<PartySelectScreen partyID={partyId}> </PartySelectScreen>
            	<AddParty userID={userId}></AddParty>
				
            </Grid>
			<Grid item xs={12}>
			<PartyScreen pkids={[]}  partyID={partyId}></PartyScreen>
			</Grid>
        </Grid>
    );
}
export default AdminView;
