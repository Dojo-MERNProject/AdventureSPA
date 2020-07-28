import React, {useState} from 'react';
import Layers from './Dashboard/Layers';
import Map from './Dashboard/Map';
import Stops from './Dashboard/Stops';
import Travel from './Dashboard/Travel';
import Weather from './Dashboard/Weather';


const Dashboard = (props) => {

  // State
  const [stops,setStops]= useState();
  const [adventure,setAdventure] = useState();

  // Handlers
  const toggleHandler = (e) =>{
    console.log("Toggle Handler")
    //Toggle this.layer on and off
    // bool: if on, turn off.  if off, turn on
  }

  return (
    <div>
      <div className="dashboardContainer">
        <div className="toprow">
          <div className="layers">
            <Layers
              toggleHandler = {toggleHandler}
            />
          </div>
          <div className="map"><Map/></div>
          <div className="stops">
            <Stops
              stops = {stops}
              setStops = {setStops}
            />
          </div>
        </div>
        <div className="bottomrow">
          <div className="travel">
            <Travel
              stops = {stops}
              setStops = {setStops}
            />
          </div>
          <div className="weather"><Weather/></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;