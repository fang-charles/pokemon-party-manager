import axios from 'axios';
import { Boat } from '../types/types';

const apiUrl = 'http://localhost/cs4750/pokemon-party-manager/src/php/';

export function getAllBoats() {
    return axios.post<Boat[]>(apiUrl + 'getAllBoats.php', { fname: 'getAllBoats' });
}

export function getABoat() {
    return axios.post<Boat>(apiUrl + 'getAllBoats.php', { fname: 'getABoat' });
}

export function addBoat(boat: Boat) {
    return axios.post(apiUrl + `addBoat.php`, { fname: 'addBoat', dataPacket: boat });
}
