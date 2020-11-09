import React, { useState } from 'react';
import axios from 'axios';
import {Boat} from './types/types'








function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [bid, setBID] = useState("000");
  const [allBoats, setAllBoats] = useState<Boat[]>([]);
  const [boatCount, setBoatCount] = useState<number>(0);

  const apiUrl = 'http://localhost/cs4750/pokemon-party-manager/src/php/getAllBoats.php';

  function getAllBoats(){
    axios.get<Boat[]>(apiUrl)
    .then(response => {
      console.log(response.data);
      setAllBoats(response.data);
      setBoatCount(response.data.length);
      setCount(response.data.length);
    });
  }

  function addBoat(boat: Boat){
    axios.post(`http://localhost/cs4750/pokemon-party-manager/src/php/addBoat.php`, boat)
    .then(res => {
      console.log(res);
      console.log(res.data);
      getAllBoats();
    })
  }
        React.useEffect(
          () => {
            getAllBoats();

          },
          [],
        );

  return (
    <div>
      <p>SELECT: {boatCount} </p>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={() => addBoat(
        new Boat(count.toString(),"newBoatName","white"))}>
        Add Boat
      </button>
    </div>
  );
}
export default Example;