import React, { useState } from 'react';
import axios from 'axios';
import {Boat, Person} from './types/types';
import {getAllBoats, addBoat, getABoat} from './axios/api';
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
              let p: Person = {name:"Charles", age:22};
              console.log(p);
              p.parent = {name:"Charles", age:22};
              console.log(p);

              let boat = getABoat();
              console.log(boat);
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
        setCount(count+1);
      addBoat(new Boat(count.toString(),"newBoatName","white"));
      
      }
        
        }>
        Add Boat
      </button>
      {allBoats.map((boat)=> <ExampleBoatView myBoat={boat}></ExampleBoatView>)}
      
    </div>
  );
}
export default Example;