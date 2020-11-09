import React, { useState } from 'react';
import axios from 'axios';
import {Boat} from './types/types';
import {getAllBoats, addBoat} from './axios/api';
import ExampleBoatView from './ExampleBoatView'






function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [bid, setBID] = useState("000");
  const [allBoats, setAllBoats] = useState<Boat[]>([]);
  const [boatCount, setBoatCount] = useState<number>(0);

  const apiUrl = 'http://localhost/cs4750/pokemon-party-manager/src/php/getAllBoats.php';



        React.useEffect(
          () => {
            getAllBoats().then(response => {
              console.log(response.data);
              setAllBoats(response.data);
              setBoatCount(response.data.length);

            });

          },
          [count],
        );



  return (
    <div>
      <p>SELECT: {boatCount} </p>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={() => {
      addBoat(new Boat(count.toString(),"newBoatName","white"));
      setCount(count+1);
      }
        
        }>
        Add Boat
      </button>
      {allBoats.map((boat)=> <ExampleBoatView myBoat={boat}></ExampleBoatView>)}
      
    </div>
  );
}
export default Example;