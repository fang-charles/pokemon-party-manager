import axios from 'axios';
import { Boat, BasePokemon, Item, Party, User, Move, Pokemon } from '../types/types';

//const apiUrl = 'http://localhost/cs4750/pokemon-party-manager/src/php/';
const apiUrl = 'http://www.cs.virginia.edu/~jw8kc/pokemon-party-manager/src/php/';

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

export function deletePokemon(pokeID: number) {
    return axios.post<Pokemon>(apiUrl + 'pokemon.php', { fname: 'deletePokemon', dataPacket: { id77: pokeID } });
}

//Items
export function getItem(itemName: String) {
    return axios.post<Item>(apiUrl + 'item.php', { fname: 'getItem', dataPacket: { name77: itemName } });
}

export function gainItem(pokemonID: number, itemName: String) {
    return axios.post<Item>(apiUrl + 'item.php', { fname: 'gainItem', dataPacket: { pk_id: pokemonID, name77: itemName } });
}   // Jammie
export function loseItem(pk_id: number, itemName: String) {
    return axios.post<Item>(apiUrl + 'item.php', { fname: 'loseItem', dataPacket: { pk_id: pk_id, name77: itemName } });
}

//Party
export function getParty(partyID: number) {
    return axios.post<Party>(apiUrl + 'party.php', { fname: 'getParty', dataPacket: { id77: partyID } });
}

export function deleteParty(partyID: number) {
    return axios.post<Party>(apiUrl + 'party.php', { fname: 'deleteParty', dataPacket: { id77: partyID } });
}

export function addParty(userID: number) {
    return axios.post<Party>(apiUrl + 'party.php', { fname: 'addParty', dataPacket: { id77: userID } });
} // Jammie

//User
export function getUser(userID: number) {
    return axios.post<User>(apiUrl + 'user.php', { fname: 'getUser', dataPacket: { id77: userID } });
}

export function getUserID(username: String) {
    return axios.post<User>(apiUrl + 'user.php', { fname: 'getUserID', dataPacket: { id77: username } });
}

//Move
export function getMove(moveName: String) {
    return axios.post<Move>(apiUrl + 'move.php', { fname: 'getMove', dataPacket: { name77: moveName } });
}

export function learnMove(pokemonID: number, moveA: String, moveB: String, moveC: String, moveD: String) {
    return axios.post<Move>(apiUrl + 'move.php', { fname: 'learnMove', dataPacket: { pk_id: pokemonID, move1: moveA, move2:moveB, move3:moveC, move4:moveD} });
} // Jammie


export function forgetMove(pokemonID: number, moveName:String) {
    return axios.post<Move>(apiUrl + 'move.php', { fname: 'forgetMove', dataPacket: { pk_id: pokemonID, name77: moveName } });
} // Jammie
//Something for specific pokemon
export function getSpecificPokemon(pkid: number) {
    return axios.post<Pokemon>(apiUrl + 'pokemon.php', {
        fname: 'getSpecificPokemon',
        dataPacket: { pokemonid: pkid },
    });
}

export function addPokemon(pokedexNumber: number, lev: number, nickname: String, party_id: number) {
    return axios.post<string>(apiUrl + 'pokemon.php', {
        fname: 'addPokemon',
        dataPacket: { pokedex_number: pokedexNumber, level: lev, nickname: nickname, party_id: party_id },
    });
}

