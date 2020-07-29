import React, {useEffect} from 'react';

const Stops = ({stops,setStops}) => {

  useEffect(()=>{
    //Create new adventure list to add stops to
  });

  return (
    <div>
      <h3>Adventure Stops</h3>
      <label>Adventure Name:</label>
      <input type="text" value="My Adventure"/>
      {/* <ol>
        <li className="typeClimb" style={{color: "#336799"}}>Crazy Crag</li>
        <li className="typeRide" style={{color: "#8F181C"}}>Speed Mountain</li>
        <li className="typeRun" style={{color: "#C06028"}}>Trail Loop</li>
        <li className="typeHike" style={{color: "#578F3F"}} >Big Hike</li>
      </ol> */}
      <ol>
        {
          stops.map((stop,i)=>
          <section key={i}>

            <li style={stop.style}>{stop.title}</li>
            <p>
             <span className="stopDateTime"> Start </span>
              <input type="date"/>
              <input type="time"/>
            </p>
            <p>
              <span className="stopDateTime">End</span>
              <input type="date"/>
              <input type="time"/>
            </p>
          </section>
          )
        }
      </ol>
      <br/>
      <button>Create Adventure</button>
    </div>
  )
}

export default Stops;