import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// UPDATE: Create Functions that take an array & returns modified array
// UPDATE: Use function return data instead of state data

const Map = ({ map, setMap, stops, setStops, addStop,adventure, mountains, setMountains}) => {

  const [center, setCenter] = useState();
  const mapContainerRef = useRef(null);

  // Initialize map & all current api data
  // Houses map event listeners
  useEffect(() => {
    // Generates Base Map
    map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-105.456, 39.88], // starting position [lng, lat]
      zoom: 10, // starting zoom
    });
    // Adds controls to map interface
    map.addControl(new mapboxgl.NavigationControl());
    var mapCenter = map.getCenter();
    var centerLat = mapCenter.lat;
    var centerLon = mapCenter.lng;
    getRoutes(centerLat, centerLon)
    getHikes(centerLat, centerLon)
    getPowder(centerLat, centerLon);
    getTrailRuns(centerLat, centerLon);
    setMap(map)
    console.log("Map Initialized")

    // End of map movement Event Listener
    map.on('moveend', function () {
      mapCenter = map.getCenter();
      centerLat = mapCenter.lat;
      centerLon = mapCenter.lng;
      // console.log("Center Lat: ",centerLat," Center Lon: ",centerLon)
      removeLayers();
      getRoutes(centerLat, centerLon);
      getHikes(centerLat, centerLon);
      getPowder(centerLat, centerLon);
      getTrailRuns(centerLat, centerLon);
    });

    map.on("mouseenter", "routeFeatures", function (e) {
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });

    map.on("mouseenter", "hikeFeatures", function (e) {
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });

    map.on("mouseenter", "powderFeatures", function (e) {
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });

    // Add Stops
    // setStops(

    
    map.on("click", "routeFeatures", function (e) {
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;
      var routetitle = e.features[0].properties.title;
      var routeid = e.features[0].properties.id;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);

        setMountains("2200")
        addStop(routeid, routetitle)
      console.log("Map",stops)
      // return addStop(id, title)
    })
    // )

    return () => map.remove();
  }, []);

  // Get all route data for specific center point
  function getRoutes(lat, lon) {
    // GET api data for routes
    const maxDistance = 10;
    const baseUrl = "https://www.mountainproject.com/data/get-routes-for-lat-lon?";
    const mountainKey = "200809636-c7cbec7094518a25d825fd563e1f84ab";
    axios.get(
      `${baseUrl}lat=${lat}&lon=${lon}&maxDistance=${maxDistance}&key=${mountainKey}`)
      .then(res => {
        addRouteLayer(res.data.routes)
      })
      .catch(err => {
        console.log(err)
      })
  }

  //Creates dataset of current routes
  function addRouteLayer(currentRoutes) {
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
          id: `${currentRoutes[i].id}`,
          title: `${currentRoutes[i].name}`,
          "marker-symbol": "monument",
          description: `<strong> ${currentRoutes[i].name}</strong>
          <p><a href="${currentRoutes[i].url}
          " target="_blank" title="Opens in a new window">
          ${currentRoutes[i].name}</a> is an awesome crack</p>
          </p>
            <p>
              <a href="">Add to Adventure</a>`,
          icon: "mountain",
        },
      });
    }
    map.addSource("routeFeatures", routeFeatures);
    map.addLayer({
      id: "routeFeatures",
      type: "symbol",
      source: "routeFeatures",
      layout: {
        "icon-image": "{icon}-15",
        "icon-allow-overlap": true,
      },
    });
    console.log("Route Layer Added", routeFeatures);
  };

  // function addStop(id, title) {
    // console.log(stops)
    // var newStops = [...stops,
    // {
    //   title: `${title}`,
    //   type: "route",
    //   style: {
    //     color: "#336799"
    //   }
    // }]
    // console.log("New Stops",newStops)
    // setStops(newStops)
    // setStops([{
    //   title: `${title}`,
    //   type: "route",
    //   style: {
    //     color: "#336799"
    //   }
    // }])
    // return newStops
  // }

  // Get all hike data for specific center point
  function getHikes(lat, lon) {

    // GET api data for routes
    const maxDistance = 10;
    const baseUrl = "https://www.hikingproject.com/data/get-trails?";
    const hikeKey = "110170838-33c2b1ad523334aa9bf56f585ae8a1b6";
    axios.get(
      `${baseUrl}lat=${lat}&lon=${lon}&maxDistance=${maxDistance}&key=${hikeKey}`)
      .then(res => {
        // console.log("Hikes API: ",res) //Identical to Trail Run
        addHikeLayer(res.data.trails)
      })
      .catch(err => {
        console.log(err)
      })
  }

  //Creates dataset of current hikes
  function addHikeLayer(currentHikes) {
    // Initialize empty features array
    var hikeFeatures = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    }
    // Push hike data into feature collection
    for (let i = 0; i < currentHikes.length; i++) {
      hikeFeatures.data.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            currentHikes[i].longitude,
            currentHikes[i].latitude,
          ],
        },
        properties: {
          title: `${currentHikes[i].name}`,
          "marker-symbol": "monument",
          description: `<strong> ${currentHikes[i].name}</strong>
          <p><a href="${currentHikes[i].url}
          " target="_blank" title="Opens in a new window">
          ${currentHikes[i].name}</a> is an awesome crack</p>
          </p>
            <p>
              <a href="">Add to Adventure</a>`,
          icon: "park",
        },
      });
    }
    map.addSource("hikeFeatures", hikeFeatures);
    map.addLayer({
      id: "hikeFeatures",
      type: "symbol",
      source: "hikeFeatures",
      layout: {
        "icon-image": "{icon}-15",
        "icon-allow-overlap": true,
      },
    });
    console.log("Hike Layer Added", hikeFeatures);
  };

  // Get all ski/snowboard run data for specific center point
  function getPowder(lat, lon) {

    // GET api data for routes
    const maxDistance = 10;
    const baseUrl = "https://www.powderproject.com/data/get-trails?";
    const powderKey = "110170838-33c2b1ad523334aa9bf56f585ae8a1b6";
    axios.get(
      `${baseUrl}lat=${lat}&lon=${lon}&maxDistance=${maxDistance}&key=${powderKey}`)
      .then(res => {
        addPowderLayer(res.data.trails)
      })
      .catch(err => {
        console.log(err)
      })
  }

  //Creates dataset of current hikes
  function addPowderLayer(currentRuns) {
    // Initialize empty features array
    var powderFeatures = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    }
    // Push hike data into feature collection
    for (let i = 0; i < currentRuns.length; i++) {
      powderFeatures.data.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            currentRuns[i].longitude,
            currentRuns[i].latitude,
          ],
        },
        properties: {
          title: `${currentRuns[i].name}`,
          "marker-symbol": "monument",
          description: `
            <strong> ${currentRuns[i].name}</strong>
            <p>
              <a href="${currentRuns[i].url} "target="_blank" title="Opens in a new window">
                ${currentRuns[i].name}
              </a>
               is an awesome crack
            </p>
            <p>
              <a href="">Add to Adventure</a>
            </p>`,

          icon: "harbor",
        },
      });
    }
    map.addSource("powderFeatures", powderFeatures);
    map.addLayer({
      id: "powderFeatures",
      type: "symbol",
      source: "powderFeatures",
      layout: {
        "icon-image": "{icon}-15",
        "icon-allow-overlap": true,
      },
    });
    console.log("Powder Layer Added", powderFeatures);
  };

  // Get all trail run data for specific center point
  function getTrailRuns(lat, lon) {

    // GET api data for routes
    const maxDistance = 10;
    const baseUrl = "https://www.trailrunproject.com/data/get-trails?";
    const trailRunKey = "110170838-33c2b1ad523334aa9bf56f585ae8a1b6";
    axios.get(
      `${baseUrl}lat=${lat}&lon=${lon}&maxDistance=${maxDistance}&key=${trailRunKey}`)
      .then(res => {
        // console.log("Trail Runs API: ",res) // Identical to Hikes
        addTrailRunLayer(res.data.trails)
      })
      .catch(err => {
        console.log(err)
      })
  }

  //Creates dataset of current hikes
  function addTrailRunLayer(currentTrailRuns) {
    // Initialize empty features array
    var trailRunFeatures = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    }
    // Push hike data into feature collection
    for (let i = 0; i < currentTrailRuns.length; i++) {
      trailRunFeatures.data.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            currentTrailRuns[i].longitude,
            currentTrailRuns[i].latitude,
          ],
        },
        properties: {
          title: `${currentTrailRuns[i].name}`,
          "marker-symbol": "monument",
          description: `
            <strong> ${currentTrailRuns[i].name}</strong>
            <p>
              <a href="${currentTrailRuns[i].url} "target="_blank" title="Opens in a new window">
                ${currentTrailRuns[i].name}
              </a>
               is an awesome trail run
            </p>
            <p>
              <a href="">Add to Adventure</a>
            </p>`,

          icon: "attraction",
        },
      });
    }
    map.addSource("trailRunFeatures", trailRunFeatures);
    map.addLayer({
      id: "trailRunFeatures",
      type: "symbol",
      source: "trailRunFeatures",
      layout: {
        "icon-image": "{icon}-15",
        "icon-allow-overlap": true,
      },
    });
    console.log("Trail Run Layer Added", trailRunFeatures);
  };

  //Removes all previous layers
  function removeLayers() {
    if (map.getLayer("routeFeatures")) {
      map.removeLayer("routeFeatures");
      map.removeSource("routeFeatures");
    }

    if (map.getLayer("hikeFeatures")) {
      map.removeLayer("hikeFeatures");
      map.removeSource("hikeFeatures");
    }

    if (map.getLayer("powderFeatures")) {
      map.removeLayer("powderFeatures");
      map.removeSource("powderFeatures");
    }

    if (map.getLayer("trailRunFeatures")) {
      map.removeLayer("trailRunFeatures");
      map.removeSource("trailRunFeatures");
    }
  }


  return (
    <div className="mapdiv">
      <div><p>{adventure}</p></div>
      {/* <p>{mountains}</p> */}
      <div className="map-container" ref={mapContainerRef} />
    </div>
  )
}

export default Map;