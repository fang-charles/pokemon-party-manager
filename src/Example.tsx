import React, { useState } from 'react';
import axios from 'axios';
import {Boat} from './types/types'


function addBoat(boat: Boat){
  axios.post(`http://localhost/cs4750/pokemon-party-manager/src/php/addBoat.php`, boat)
  .then(res => {
    console.log(res);
    console.log(res.data);
  })
}

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [bid, setBID] = useState("000");

  const apiUrl = 'http://localhost/cs4750/pokemon-party-manager/src/php/getAllBoats.php';



        React.useEffect(
          () => {
            axios.get<Boat[]>(apiUrl)
            .then(response => {
              console.log(response.data);
              setBID(response.data[0].bname);
            });

          },
          [],
        );

  return (
    <div>
      <p>BID: {bid} </p>
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