import React from 'react';
// NOT WORKING: import '../styles/features/checkboxes.css';
const Layers = (props) => {
  return (
    <div>
      <div className="row">
        {/* Checkbox Not Working/}
              {/* <label class="checkbox bounce">
                <input type="checkbox" checked></input>
                <svg viewBox="0 0 21 21">
                  <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                </svg>
              </label> */}
        <div className="climbingToggle">
        </div>
        <div className="toggleName">Climbing routes</div>
      </div>
      <div className="row">
        <div className="hikingToggle"></div>
        <div className="toggleName">Hiking Trails</div>
      </div>
    </div>
  )
}

export default Layers;