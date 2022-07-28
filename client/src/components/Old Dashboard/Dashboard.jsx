import React, { useState } from 'react';
import Map from './Dashboard/Map';
import AdventureLayers from './Dashboard/AdventureLayers';
import AdventureStops from './Dashboard/AdventureStops';
import Travel from './Dashboard/Travel';
import Weather from './Dashboard/Weather';


const Dashboard = (props) => {

  //State
  const [map, setMap] = useState({}); // Blank map state

  // Dummy data for mountains
  const [mountains, setMountains] = useState(
    {
      nam: "The Mountain",
      tie: "of CO"
    },
    {
      nam: "The Mountain2",
      tie: "of CA"
    })

  // Dummy data for stops
  const [stops, setStops] = useState([
    {
      title: "Crazy Crag",
      type: "route",
      style: {
        color: "#336799"
      }
    },
    {
      title: "Speed Mountain",
      type: "hike",
      style: {
        color: "#8F181C"
      }
    },
    {
      title: "Trail Loop",
      type: "run",
      style: {
        color: "#C06028"
      }
    },
    {
      title: "Big Hike",
      type: "hike",
      style: {
        color: "#578F3F"
      }
    }
  ])

  // Blank variable for adventure (Itinerary)
  const [adventure, setAdventure] = useState("Open");

  // Left Sidebar open boolean
  const [leftOpen, setLeftOpen] = useState(false);

  // Left Sidebar Toggle Style States
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

  // Right Sidebar open boolean
  const [rightOpen, setRightOpen] = useState(false);

  // Left Bottom Drawer open boolean
  const [leftDrawer, setLeftDrawer] = useState(false);

  // Rigt Bottom Drawer open boolean
  const [rightDrawer, setRightDrawer] = useState(false);

  const leftSidebarHandler = (e) => {
    setLeftOpen(!leftOpen); // Set boolean to opposite of current state
  }

  const rightSidebarHandler = (e) => {
    setRightOpen(!rightOpen); // Set boolean to opposite of current state
  }

  const leftDrawerHandler = (e) => {
    setLeftDrawer(!leftDrawer); // Set boolean to opposite of current state
  }

  const rightDrawerHandler = (e) => {
    setRightDrawer(!rightDrawer); // Set boolean to opposite of current state
  }

  const toggleHandler = (e) => {
    console.log("Empty Toggle Handler")
  }

  const climbingToggleHandler = (e) => {
    console.log("Dashboard Stops:", stops)
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

  const addStop = (routeid, routetitle) => {
    console.log(stops)
    var newStops = [...stops,
    {
      title: `${routetitle}`,
      type: "route",
      style: {
        color: "#336799"
      }
    }]
    console.log("New Stops", newStops)
    setStops(newStops)
    setAdventure("Closed")
    console.log(adventure)
    console.log("Stop Added")
  }

  return (
    <div>
      <div className="dashboard">
        <div className="top-row">
          <div className={`layers ${leftOpen ? 'leftopen' : 'leftclosed'}`}>  {/* Toggle div on and off */}
            <AdventureLayers
              toggleHandler={toggleHandler}
              climbingToggleHandler={climbingToggleHandler}
              climbingToggleStyle={climbingToggleStyle}
              hikingToggleHandler={hikingToggleHandler}
              hikingToggleStyle={hikingToggleStyle}
              powderToggleHandler={powderToggleHandler}
              powderToggleStyle={powderToggleStyle}
              trailRunToggleHandler={trailRunToggleHandler}
              trailRunToggleStyle={trailRunToggleStyle}
              leftSidebarHandler={leftSidebarHandler}
              mountains={mountains}
            />
          </div>
          <div className="map">
            <Map
              map={map}
              setMap={setMap}
              stops={stops}
              setStops={setStops}
              addStop={addStop}
              adventure={adventure}
              mountains={mountains}
              setMountains={setMountains}
              leftSidebarHandler={leftSidebarHandler}
              rightSidebarHandler={rightSidebarHandler}
              leftDrawerHandler={leftDrawerHandler}
              rightDrawerHandler={rightDrawerHandler}
            />
          </div>
          <div className={`stops ${rightOpen ? 'rightopen' : 'rightclosed'}`}>  {/* Toggle div on and off */}
            <AdventureStops
              stops={stops}
              setStops={setStops}
            />
          </div>
        </div>
        <div className="bottom-row">
          <div className={`travel ${leftDrawer ? 'ldraweropen' : 'ldrawerclosed'}`}>  {/* Toggle div on and off */}
            <Travel
              stops={stops}
              setStops={setStops}
            />
          </div>
          <div className={`weather ${rightDrawer ? 'rdraweropen' : 'rdrawerclosed'}`}>  {/* Toggle div on and off */}
            <Weather /></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;