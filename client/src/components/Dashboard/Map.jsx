import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = (props) => {
  var map = {};
  var lat = 0;
  var lon = 0;
  var centerLat = 40.03;
  var centerLon = -105.25;

  const [center, setCenter] = useState([centerLon, centerLat])
  const mapContainerRef = useRef(null);

  useEffect(() => {

    // Generates Base Map
    var map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center, // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    // Adds controls to map interface
    map.addControl(new mapboxgl.NavigationControl());
      console.log('A moveend event occurred.');
      getRoutes()


    map.on('moveend', function() {
      let center = map.getCenter();
      console.log('A moveend event occurred.');
      getRoutes()
      });
    return () => map.remove();
  }, []);

  function getRoutes() {
    const maxDistance=10;
    axios.get("https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=" +
      centerLat +
      "&lon=" +
      centerLon +
      "&maxDistance=" +
      maxDistance +
      "&key=200809636-c7cbec7094518a25d825fd563e1f84ab")
      .then(res => {
        console.log(res.data.routes)
      }).catch(err => {
        console.log(err)
      })
  }

  

  return (
    <div className="mapdiv">
      <div className="map-container" ref={mapContainerRef} />
    </div>
  )
}

export default Map;