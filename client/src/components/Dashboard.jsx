import React, {useState} from 'react';
import Layers from './Dashboard/Layers';
import Map from './Dashboard/Map';
import Stops from './Dashboard/Stops';
import Travel from './Dashboard/Travel';
import Weather from './Dashboard/Weather';


const Dashboard = (props) => {

  //State
  const [map,setMap] = useState({});
  const [stops,setStops]= useState([
    {
      name:"Crazy Crag",
      type:"route",
      style:{
        color:"#336799"
      }
    },
    {
      name:"Speed Mountain",
      type:"hike",
      style:{
        color:"#8F181C"
      }
    },
    {
      name:"Trail Loop",
      type:"run",
      style:{
        color:"#C06028"
      }
    },
    {
      name:"Big Hike",
      type:"hike",
      style:{
        color:"#578F3F"
      }
    }
  ]);
  const [adventure,setAdventure] = useState();

  // Style States
  const [climbingToggleStyle,setClimbingToggleStyle] = useState({
    backgroundColor:"#336799",
    border: "solid gray 1px"
  });
  const [hikingToggleStyle,setHikingToggleStyle] = useState({
    backgroundColor:"#578F3F",
    border: "solid gray 1px"
  });

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
      setClimbingToggleStyle({
        backgroundColor:"transparent",
        border: "solid gray 1px"})
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
      setClimbingToggleStyle({
        backgroundColor:"#336799",
        border: "solid gray 1px"})
    }
  }

  const hikingToggleHandler = (e) =>{
    console.log("Hiking Toggle Handler")
    if(map.getLayer("hikeFeatures")){
      map.removeLayer("hikeFeatures")
      setHikingToggleStyle({
        backgroundColor:"transparent",
        border: "solid gray 1px"})
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
      setHikingToggleStyle({
        backgroundColor:"#578F3F",
        border: "solid gray 1px"})
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
              climbingToggleStyle = {climbingToggleStyle}
              hikingToggleHandler = {hikingToggleHandler}
              hikingToggleStyle = {hikingToggleStyle}
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