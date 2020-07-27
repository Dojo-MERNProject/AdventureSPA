import React from 'react';
import Layers from './Dashboard/Layers';
import Map from './Dashboard/Map';
import Stops from './Dashboard/Stops';
import Travel from './Dashboard/Travel';
import Weather from './Dashboard/Weather';


const Dashboard = (props) => {
  return (
    <div>
      <div className="dashboardContainer">
        <div className="toprow">
          <div className="layers"><Layers /></div>
          <div className="map"><Map/></div>
          <div className="stops"><Stops/></div>
        </div>
        <div className="bottomrow">
          <div className="travel"><Travel/></div>
          <div className="weather"><Weather/></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;