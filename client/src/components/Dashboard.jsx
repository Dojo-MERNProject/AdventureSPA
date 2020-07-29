import React, { useState } from 'react';
import Layers from './Dashboard/Layers';
import Map from './Dashboard/Map';
import Stops from './Dashboard/Stops';
import Travel from './Dashboard/Travel';
import Weather from './Dashboard/Weather';


const Dashboard = (props) => {

  //State
  const [map, setMap] = useState({});
  const [stops, setStops] = useState([
    {
      name: "Crazy Crag",
      type: "route",
      style: {
        color: "#336799"
      }
    },
    {
      name: "Speed Mountain",
      type: "hike",
      style: {
        color: "#8F181C"
      }
    },
    {
      name: "Trail Loop",
      type: "run",
      style: {
        color: "#C06028"
      }
    },
    {
      name: "Big Hike",
      type: "hike",
      style: {
        color: "#578F3F"
      }
    }
  ]);
  const [adventure, setAdventure] = useState();
  const [layersOpen, setLayersOpen] = useState(true);
  const [spotsOpen, setSpotsOpen] = useState(true);

  // Style States
  const [climbingToggleStyle, setClimbingToggleStyle] = useState({
    // background: url(Mountain.svg),
    backgroundColor: "#336799",
    border: "solid gray 1px"
  });
  const [hikingToggleStyle, setHikingToggleStyle] = useState({
    backgroundColor: "#578F3F",
    border: "solid gray 1px"
  });
  const [powderToggleStyle, setPowderToggleStyle] = useState({
    backgroundColor: "#6D95BF",
    border: "solid gray 1px"
  });
  const [trailRunToggleStyle, setTrailRunToggleStyle] = useState({
    backgroundColor: "#C16026",
    border: "solid gray 1px"
  });

  // Handlers
  const sidebarHandler = (e) => {
    // Reference: https://davidde.github.io/sidebars/
    // Github: https://github.com/davidde/sidebars
    // SASS: https://sass-lang.com/guide
    console.log("Sidebar Handler")
    console.log(`${e.target.id}`)
    // changeCSSLayers(layersOpen);
    setLayersOpen(!layersOpen);
    console.log("layersOpen State: ",layersOpen)
    let layersOpenClass = layersOpen? 'open' : 'closed'; //let is within this scope
    console.log("layersOpen CSS: ",layersOpenClass)
  };

  // function changeCSSLayers (layersOpenState) {
  //   let layersOpenClass = layersOpenState? 'open' : 'closed'; //let is within this scope
  //       console.log("layersOpen CSS: ",layersOpenClass)
  // }

  const toggleHandler = (e) => {
    console.log("Toggle Handler")
    //Toggle this.layer on and off
    // bool: if on, turn off.  if off, turn on
  }

  const climbingToggleHandler = (e) => {
    console.log("Climbing Toggle Handler")
    if (map.getLayer("routeFeatures")) {
      map.removeLayer("routeFeatures")
      setClimbingToggleStyle({
        backgroundColor: "transparent",
        border: "solid gray 1px"
      })
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
        backgroundColor: "#336799",
        border: "solid gray 1px"
      })
    }
  }

  const hikingToggleHandler = (e) => {
    console.log("Hiking Toggle Handler")
    if (map.getLayer("hikeFeatures")) {
      map.removeLayer("hikeFeatures")
      setHikingToggleStyle({
        backgroundColor: "transparent",
        border: "solid gray 1px"
      })
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
        backgroundColor: "#578F3F",
        border: "solid gray 1px"
      })
    }
  }

  const powderToggleHandler = (e) => {
    console.log("Powder Toggle Handler")
    if (map.getLayer("powderFeatures")) {
      map.removeLayer("powderFeatures")
      setPowderToggleStyle({
        backgroundColor: "transparent",
        border: "solid gray 1px"
      })
    } else {
      map.addLayer({
        id: "powderFeatures",
        type: "symbol",
        source: "powderFeatures",
        layout: {
          "icon-image": "{icon}-15",
          "icon-allow-overlap": true,
        },
      });
      setPowderToggleStyle({
        backgroundColor: "#6D95BF",
        border: "solid gray 1px"
      })
    }
  }

  const trailRunToggleHandler = (e) => {
    console.log("Trail Run Toggle Handler")
    if (map.getLayer("trailRunFeatures")) {
      map.removeLayer("trailRunFeatures")
      setTrailRunToggleStyle({
        backgroundColor: "transparent",
        border: "solid gray 1px"
      })
    } else {
      map.addLayer({
        id: "trailRunFeatures",
        type: "symbol",
        source: "trailRunFeatures",
        layout: {
          "icon-image": "{icon}-15",
          "icon-allow-overlap": true,
        },
      });
      setTrailRunToggleStyle({
        backgroundColor: "#C16026",
        border: "solid gray 1px"
      })
    }
  }

  const addStop = (e) => {
    console.log("Stop Added")
  }

  return (
    <div>
      <div className="dashboardContainer">
        <div className="toprow">
          <div className="layers">
            <Layers
              toggleHandler={toggleHandler}
              climbingToggleHandler={climbingToggleHandler}
              climbingToggleStyle={climbingToggleStyle}
              hikingToggleHandler={hikingToggleHandler}
              hikingToggleStyle={hikingToggleStyle}
              powderToggleHandler={powderToggleHandler}
              powderToggleStyle={powderToggleStyle}
              trailRunToggleHandler={trailRunToggleHandler}
              trailRunToggleStyle={trailRunToggleStyle}
              sidebarHandler = {sidebarHandler}
            />
          </div>
          <div className="map">
            <Map
              map={map}
              setMap={setMap}
              addStop={addStop}
            />
          </div>
          <div className="stops">
            <Stops
              stops={stops}
              setStops={setStops}
              sidebarHandler = {sidebarHandler}
            />
          </div>
        </div>
        <div className="bottomrow">
          <div className="travel">
            <Travel
              stops={stops}
              setStops={setStops}
            />
          </div>
          <div className="weather"><Weather /></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;