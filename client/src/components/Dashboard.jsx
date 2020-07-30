import React, { useState } from 'react';
import AdventureLayers from './Dashboard/AdventureLayers';
import Map from './Dashboard/Map';
import AdventureStops from './Dashboard/AdventureStops';
import Travel from './Dashboard/Travel';
import Weather from './Dashboard/Weather';


const Dashboard = (props) => {

  //State
  const [map, setMap] = useState({});
  const [mountains,setMountains] = useState(
    {
    nam: "The Mountain",
    tie: "of CO"
  },
  {
    nam: "The Mountain2",
    tie: "of CA"
  })
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
  const [adventure, setAdventure] = useState("Open");
  const [layersOpen, setLayersOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [leftDrawer, setLeftDrawer] = useState(false);
  const [rightDrawer, setRightDrawer] = useState(false);
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
  // const sideBarHandler = (e) => {
  //   // Reference: https://davidde.github.io/sidebars/
  //   // Github: https://github.com/davidde/sidebars
  //   // SASS: https://sass-lang.com/guide
  //   console.log("Sidebar Handler")
  //   console.log(`${e.target.id}`)
  //   // changeCSSLayers(layersOpen);
  //   setLeftOpen(!leftOpen);
  //   console.log("layersOpen State: ",leftOpen)
  //   let layersOpenClass = leftOpen? 'open' : 'closed'; //let is within this scope
  //   console.log("layersOpen CSS: ",leftOpen)
  // };

  const leftSidebarHandler = (e) => {
    console.log(`${e.target.id}`)
    setLeftOpen(!leftOpen);
    console.log("leftOpen State: ", leftOpen)
  }

  const rightSidebarHandler = (e) => {
    console.log(`${e.target.id}`)
    setRightOpen(!rightOpen);
    console.log("leftOpen State: ", rightOpen)
  }

  const leftDrawerHandler = (e) => {
    console.log(`${e.target.id}`)
    setLeftDrawer(!leftDrawer);
    console.log("leftOpen State: ", leftDrawer)
  }

  const rightDrawerHandler = (e) => {
    console.log(`${e.target.id}`)
    setRightDrawer(!rightDrawer);
    console.log("leftOpen State: ", rightDrawer)
  }

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

  const addStop = (id,title) => {
    console.log(stops)
    var newStops = [...stops,
    {
      title: `${title}`,
      type: "route",
      style: {
        color: "#336799"
      }
    }]
    console.log("New Stops",newStops)
    setStops(newStops)
    setAdventure("Closed")
    console.log(adventure)
    console.log("Stop Added")
  }

  return (
    <div>
      <div className="dashboardContainer">
        <div className="toprow">
          <div className={`layers ${leftOpen ? 'leftopen' : 'leftclosed'}`}>
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
              leftSidebarHandler = {leftSidebarHandler}

              mountains = {mountains}
            />
          </div>
          <div className="map">
            <Map
              map={map}
              setMap={setMap}
              stops={stops}
              setStops = {setStops}
              addStop = {addStop}
              adventure = {adventure}
              mountains = {mountains}
              setMountains = {setMountains}
              leftSidebarHandler = {leftSidebarHandler}
              rightSidebarHandler = {rightSidebarHandler}
              leftDrawerHandler= {leftDrawerHandler}
              rightDrawerHandler= {rightDrawerHandler}
            />
          </div>
          <div className={`stops ${rightOpen ? 'rightopen' : 'rightclosed'}`}>
            <AdventureStops
              stops={stops}
              setStops={setStops}
            />
          </div>
        </div>
        <div className="bottomrow">
          <div className={`travel ${leftDrawer ? 'ldraweropen' : 'ldrawerclosed'}`}>
            <Travel
              stops={stops}
              setStops={setStops}
            />
          </div>
          <div className={`weather ${rightDrawer ? 'rdraweropen' : 'rdrawerclosed'}`}><Weather /></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;