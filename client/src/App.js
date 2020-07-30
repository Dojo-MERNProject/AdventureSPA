// Modules
import React from "react";
import { Router } from "@reach/router"; // Needs the {} to export

// CSS
import "./App.css"; // Only need to import here
// import '../src/styles/Dashboard.css';
import "./styles/features/mapbox.css";
import "./styles/Dashboard-mobile.css";

// Components
import Dashboard from "./components/Dashboard";
import Map from "./components/Dashboard/Map";

function App() {
  return (
    <div className="App">
      <Router>
        <Dashboard path="/Dashboard" />
        <Map path="/map" />
      </Router>
    </div>
  );
}

export default App;
