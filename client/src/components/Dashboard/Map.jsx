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

  const [center, setCenter] = useState([centerLon, centerLat]);
  const [routes, setRoutes] = useState({});
  const [routefeatures,setRoutefeatures] = useState({});
  const [routeFeatures,setRouteFeatures] = useState({});
  const mapContainerRef = useRef(null);

  // Initialize map & all current api data
  // Houses map event listeners
  useEffect(() => {

    // Generates Base Map
    map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center, // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    // Adds controls to map interface
    map.addControl(new mapboxgl.NavigationControl());
    getRoutes(centerLat,centerLon)
    console.log("Map Initialized")

    // End of map movement Event Listener
    map.on('moveend', function () {
      // let center2 = map.getCenter();
      // console.log(`Get Center2: ${center2}`)
      setCenter(map.getCenter());
      // console.log(`This is the ${center}`)
      centerLat = center[1];
      centerLon = center[0];
      // console.log(`Center Lat: ${centerLat} Center Lon: ${centerLon}`)
      getRoutes(centerLat,centerLon);
    });
    return () => map.remove();
  }, []);

  // Get all route data for specific center point
  function getRoutes(lat,lon) {

    // GET api data for routes
    const maxDistance = 10;
    const baseUrl = "https://www.mountainproject.com/data/get-routes-for-lat-lon?";
    const projectKey = "200809636-c7cbec7094518a25d825fd563e1f84ab";
    axios.get(
      `${baseUrl}lat=${lat}&lon=${lon}&maxDistance=${maxDistance}&key=${projectKey}`)
      .then(res => {
        // console.log("Res Data Routes",res.data.routes)
        // Set data to the current routes
        setRoutes(res.data.routes)
        setRoutefeatures(
          createRouteFeatures(res.data.routes)
        )
        console.log(routefeatures)
        addRouteSource();
        console.log("Map Source added")  
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  //Creates dataset of current routes
  // UPDATE: Takes an array & returns modified array
  // UPDATE: Use function return data instead of state data
  function createRouteFeatures(currentRoutes) {
    // Initialize empty features array
    var routefeatures = [];
    // Push route data into feature collection
    for (let i = 0; i < currentRoutes.length; i++) {
      routefeatures.push({
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
    console.log("Route Features",routefeatures) // Why does set state not set the array???
    return routeFeatures;
  };

  function addRouteSource() {
    console.log(`routefeatures ${routefeatures}`)
    var routeFeatures = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: routefeatures, //Currently blank
      },
    }
    console.log(`FULL Route Features ${routeFeatures}`)
    map.addSource("routeFeatures",routeFeatures)
  } 


  return (
    <div className="mapdiv">
      <div className="map-container" ref={mapContainerRef} />
    </div>
  )
}

export default Map;