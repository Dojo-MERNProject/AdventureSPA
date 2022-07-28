import React, {useEffect,useRef, useState} from 'react';
import axios from 'axios';

import mapboxgl from 'mapbox-gl';
import fetchFakeData from './data/fetchFakeData'
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = (props) => {

  const [center,setCenter] = useState([-74.5, 40])
  const mapContainerRef = useRef(null);
  var firstLoad = true;
  var map = {}

  useEffect(() => {
    var map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center, // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {
      // add the data source for new a feature collection with no features
      map.addSource('random-points-data', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });
      // now add the layer, and reference the data source above by name
      map.addLayer({
        id: 'random-points-layer',
        source: 'random-points-data',
        type: 'symbol',
        layout: {
          // full list of icons here: https://labs.mapbox.com/maki-icons
          'icon-image': 'bakery-15', // this will put little croissants on our map
          'icon-padding': 0,
          'icon-allow-overlap': true,
        },
      });
    });

    map.on('moveend', async () => {
      // get new center coordinates
      const { lng, lat } = map.getCenter();
      // fetch new data
      const results = await fetchFakeData(lng, lat);
      const results2 = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
        properties: {
          name: `Random Point #1`,
          description: `description for Random Point #1`,
        },
      }
      console.log(results2)
      // update "random-points-data" source with new data
      // all layers that consume the "random-points-data" data source will be updated automatically
      map.getSource('random-points-data').setData(results2);
    });

    return () => map.remove();    
  },[]);

  function GetRoutes(centerLat, centerLon) {
    console.log("Center Lat", centerLat, "Center Long", centerLon);
    axios.get(
      "https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=" +
        centerLat +
        "&lon=" +
        centerLon +
        // "&key=200809636-c7cbec7094518a25d825fd563e1f84ab",
      function (climbs) {
        console.log(climbs);

        var climbingFeatures = {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        };

        console.log("Climbing Features Initialized", climbingFeatures);
        console.log("Length of routes", climbs.routes.length);
        //Loop through to create a feature for each route
        for (var i = 0; i < climbs.routes.length; i++) {
          climbingFeatures.data.features.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                climbs.routes[i].longitude,
                climbs.routes[i].latitude,
              ],
            },
            properties: {
              title: "Mapbox DC",
              "marker-symbol": "monument",
              description:
                "<strong>" +
                climbs.routes[i].name +
                '</strong><p><a href="' +
                climbs.routes[i].url +
                '" target="_blank" title="Opens in a new window">' +
                climbs.routes[i].name +
                "</a> is an awesome crack</p>",
              icon: "mountain",
            },
          });
        }
        console.log("Climbing Features Filled", climbingFeatures);

        if (firstLoad == false) {
          //CREATED an Infinite Loop
          console.log(firstLoad);
          // If a layer with ID 'state-data' exists, remove it.
          if (map.getLayer("climbingFeatures")) {
            map.removeLayer("climbingFeatures");
            map.removeSource("climbingFeatures");
          }
        }
        map.addSource("climbingFeatures", climbingFeatures);
        // Add a layer showing the places.
        map.addLayer({
          id: "climbingFeatures",
          type: "symbol",
          source: "climbingFeatures",
          layout: {
            "icon-image": "{icon}-15",
            "icon-allow-overlap": true,
          },
        });
        console.log("Layer Added", climbingFeatures);
        console.log("got data");
      }
    ); //End $.get API data method & Function
  }

  return (
    <div className="mapdiv">
      <div className="map-container" ref={mapContainerRef}/>
    </div>
  )
}

export default Map;