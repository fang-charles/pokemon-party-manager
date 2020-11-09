import axios from 'axios';
import {Boat} from '../types/types';

  const apiUrl = 'http://localhost/cs4750/pokemon-party-manager/src/php/';

  export function getAllBoats(){
    return axios.get<Boat[]>(apiUrl+"getAllBoats.php")
  }

  export function addBoat(boat: Boat){
    return axios.post(apiUrl+`addBoat.php`, boat);
    
  }