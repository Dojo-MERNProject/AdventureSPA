import React, {useState} from 'react';
import Layers from './Dashboard/Layers';
import Map from './Dashboard/Map';
import Stops from './Dashboard/Stops';
import Travel from './Dashboard/Travel';
import Weather from './Dashboard/Weather';


const Dashboard = (props) => {

  // State
  const [map,setMap] = useState({});
  const [stops,setStops]= useState();
  const [adventure,setAdventure] = useState();

  // Handlers
  const toggleHandler = (e) =>{
    console.log("Toggle Handler")
    //Toggle this.layer on and off
    // bool: if on, turn off.  if off, turn on
  }

  const climbingToggleHandler = (e) =>{
    console.log("Climbing Toggle Handler")
    if(map.getLayer("routeFeatures")){
      map.removeLayer("routeFeatures")
    } else {
      map.addLayer({
        id: "routeFeatures",
        type: "symbol",
        source: "routeFeatures",
        layout: {
          "icon-image": "{icon}-15",
          "icon-allow-overlap": true,
        },
      });
    }
  }

  const hikingToggleHandler = (e) =>{
    console.log("Hiking Toggle Handler")
    if(map.getLayer("hikeFeatures")){
      map.removeLayer("hikeFeatures")
    } else {
      map.addLayer({
        id: "hikeFeatures",
        type: "symbol",
        source: "hikeFeatures",
        layout: {
          "icon-image": "{icon}-15",
          "icon-allow-overlap": true,
        },
      });
    }
  }

  const addStop = (e) =>{
    console.log("Stop Added")
  }

  return (
    <div>
      <div className="dashboardContainer">
        <div className="toprow">
          <div className="layers">
            <Layers
              toggleHandler = {toggleHandler}
              climbingToggleHandler = {climbingToggleHandler}
              hikingToggleHandler = {hikingToggleHandler}
            />
          </div>
          <div className="map">
            <Map
              map = {map}
              setMap = {setMap}
              addStop = {addStop}
            />
          </div>
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