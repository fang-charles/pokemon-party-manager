import axios from 'axios';
import { Boat, BasePokemon } from '../types/types';

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

export function getBasePokemon(pokedexNumber: number) {
  console.log("Trying to get base pokemon: " + pokedexNumber);
  return axios.post<BasePokemon>(apiUrl + 'pokemon.php', { fname: 'getBasePokemon', dataPacket: {pokedexNumber: pokedexNumber }});
}