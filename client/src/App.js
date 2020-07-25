import React from 'react';
import {Router} from '@reach/router'; // Needs the {} to export
import './App.css';
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="App">
      <Router>
        <Dashboard
          path="/Dashboard"
        />
      </Router>
    </div>
  );
}

export default App;
