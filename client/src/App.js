// Modules
import React from 'react';
import {Router} from '@reach/router'; // Needs the {} to export

// CSS
import './App.css'; // Only need to import here
import '../src/styles/Dashboard.scss';
import './styles/features/mapbox.css'


// Components
import Dashboard from './components/Dashboard'
// import Map from './components/Dashboard/Map'

function App() {
  return (
    <div className="App">
      <Router>
        <Dashboard
          path="/Dashboard"
        />
        {/* <Map
          path="/map"
        /> */}
      </Router>
    </div>
  );
}

export default App;
