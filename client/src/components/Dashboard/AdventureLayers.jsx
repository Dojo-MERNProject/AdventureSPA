import React from 'react';
// NOT WORKING: import '../styles/features/checkboxes.css';
const Layers = ({
  sidebarHandler,toggleHandler,
  climbingToggleHandler,climbingToggleStyle,
  hikingToggleHandler, hikingToggleStyle,
  powderToggleHandler, powderToggleStyle,
  trailRunToggleHandler,trailRunToggleStyle}) => {
  return (
    <div>
      <div className="sidebarToggle" 
           id="layers"
           className="icon"
           onClick={sidebarHandler}>
            &equiv;
      </div>
      <div className="row">Activities</div>
      <div className="rows">
        {/* Checkbox Not Working/}
              {/* <label class="checkbox bounce">
                <input type="checkbox" checked></input>
                <svg viewBox="0 0 21 21">
                  <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                </svg>
              </label> */}
        <div className="toggle climbingToggle" style={climbingToggleStyle} onClick={climbingToggleHandler}></div>
        <div className="toggleName">Climbing routes</div>
      </div>
      <div className="row2">
        <div className="toggle hikingToggle" style={hikingToggleStyle} onClick={hikingToggleHandler}></div>
        <div className="toggleName">Hiking Trails</div>
      </div>
      <div className="row2">
        <div className="toggle powderToggle" style={powderToggleStyle} onClick={powderToggleHandler}></div>
        <div className="toggleName">Powder Runs</div>
      </div>
      <div className="row2">
        <div className="toggle trailRunToggle" style={trailRunToggleStyle} onClick={trailRunToggleHandler}></div>
        <div className="toggleName">Trail Runs</div>
      </div>
      <div className="row2">
        <div className="toggle mountainBikeToggle" onClick={toggleHandler}></div>
        <div className="toggleName">Mountain Bike Trails</div>
      </div>
      <br/>
      <div className="row">Sights</div>
      <div className="row2">
        <div className="toggle waterfallToggle" onClick={toggleHandler}></div>
        <div className="toggleName">Waterfalls</div>
      </div>
      <div className="row2">
        <div className="toggle scenicOverlookToggle" onClick={toggleHandler}></div>
        <div className="toggleName">Scenic Overlooks</div>
      </div>
      <div className="row2">
        <div className="toggle hotSpringToggle" onClick={toggleHandler}></div>
        <div className="toggleName">Hot Springs</div>
      </div>
    </div>
  )
}

export default Layers;