import React, {useEffect} from 'react';

const Stops = ({stops,setStops}) => {

  useEffect(()=>{
    //Create new adventure list to add stops to
  });

  return (
    <div>
      <h3>Adventure Stops</h3>
      <ol>
        <li className="typeClimb">Crazy Crag</li>
        <li className="typeRide">Speed Mountain</li>
        <li className="typeRun">Trail Loop</li>
        <li className="typeHike">Big Hike</li>
      </ol>
    </div>
  )
}

export default Stops;