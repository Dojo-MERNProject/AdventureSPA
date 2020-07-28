import React, {useEffect} from 'react';

const Stops = ({stops,setStops}) => {

  useEffect(()=>{
    //Create new adventure list to add stops to
  });

  return (
    <div>
      <h3>Adventure Stops</h3>
      <ol>
        <li className="typeClimb" style={{color: "#336799"}}>Crazy Crag</li>
        <li className="typeRide" style={{color: "#8F181C"}}>Speed Mountain</li>
        <li className="typeRun" style={{color: "#C06028"}}>Trail Loop</li>
        <li className="typeHike" style={{color: "#578F3F"}} >Big Hike</li>
      </ol>
    </div>
  )
}

export default Stops;