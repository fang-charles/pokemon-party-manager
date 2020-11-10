import axios from 'axios';
import { Boat, BasePokemon, Item, Party, User } from '../types/types';

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

//Party
export function getParty(partyID: number) {
    return axios.post<Party>(apiUrl + 'party.php', { fname: 'getParty', dataPacket: { id77: partyID } });
}

//User
export function getUser(userID: number) {
    return axios.post<User>(apiUrl + 'user.php', { fname: 'getUser', dataPacket: { id77: userID } });
}