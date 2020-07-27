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
  const [routes, setRoutes] = useState({})
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
    getRoutes()
    console.log("Map Initialized")


    map.on('moveend', function () {
      let center = map.getCenter();
      console.log('A moveend event occurred.');
      getRoutes();
    });
    return () => map.remove();
  }, []);

  function getRoutes() {
    // Get all route data for specific center point

    // GET api data for routes
    const maxDistance = 10;
    const baseUrl = "https://www.mountainproject.com/data/get-routes-for-lat-lon?";
    const projectKey = "200809636-c7cbec7094518a25d825fd563e1f84ab";
    axios.get(
      `${baseUrl}lat=${centerLat}&lon=${centerLon}&maxDistance=${maxDistance}&key=${projectKey}`)
      .then(res => {
        console.log(res.data.routes)
        // Set data to the current routes
        setRoutes(res.data.routes)
        createRouteFeatures(res.data.routes)
      }).catch(err => {
        console.log(err)
      })
  }
  
  //Creates dataset of current routes
  function createRouteFeatures(currentRoutes) {
    // Initialize empty features array
    var routeFeatures = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    }
    // Push route data into feature collection
    for (let i = 0; i < currentRoutes.length; i++) {
      routeFeatures.data.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            currentRoutes[i].longitude,
            currentRoutes[i].latitude,
          ],
        },
        properties: {
          title: `${currentRoutes[i].name}`,
          "marker-symbol": "monument",
          description:`<strong> ${currentRoutes[i].name}</strong>
          <p><a href="${currentRoutes[i].url}
          " target="_blank" title="Opens in a new window">
          ${currentRoutes[i].name}</a> is an awesome crack</p>`,
          icon: "mountain",
        },
      });
    }
    console.log("Route Features",routeFeatures)
    return routeFeatures;
  };


  return (
    <div className="mapdiv">
      <div className="map-container" ref={mapContainerRef} />
    </div>
  )
}

export default Map;