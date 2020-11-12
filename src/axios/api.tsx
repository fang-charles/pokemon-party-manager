import axios from 'axios';
import { Boat, BasePokemon, Item, Pokemon } from '../types/types';

const apiUrl = 'http://localhost/cs4750/pokemon-party-manager/src/php/';

export function getAllBoats() {
    return axios.post<Boat[]>(apiUrl + 'getAllBoats.php', { fname: 'getAllBoats' });
}

export function getABoat() {
    return axios.post<Boat>(apiUrl + 'getAllBoats.php', { fname: 'getABoat' });
}

export function addBoat(boat: Boat) {
    return axios.post(apiUrl + 'addBoat.php', { fname: 'addBoat', dataPacket: boat });
}

export function getBasePokemon(myPokedexNumber: number) {
    return axios.post<BasePokemon>(apiUrl + 'pokemon.php', {
        fname: 'getBasePokemon',
        dataPacket: { pokedexNumber: myPokedexNumber },
    });
}

//Items
export function getItem(itemName: String) {
    return axios.post<Item>(apiUrl + 'item.php', { fname: 'getItem', dataPacket: { name77: itemName } });
}

//Something for specific pokemon
export function getSpecificPokemon(pkid: number) {
    return axios.post<Pokemon>(apiUrl + 'specificpokemon.php', { fname: 'getSpecificPokemon', dataPacket: { pokemonid: pkid } });
}
/*
export function addPokemon(pkid: number) {
    return axios.post<Pokemon>(apiUrl + 'addPokemon.php', { fname: 'addPokemon', dataPacket: { name77: itemName } });
}

export function addParty(partyid: number) {
    return axios.post<Party>(apiUrl + 'addParty.php', { fname: 'addParty', dataPacket: { name77: itemName } });
}
*/