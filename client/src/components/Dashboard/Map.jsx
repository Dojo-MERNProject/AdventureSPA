import React, {useEffect,useRef, useState} from 'react';

import mapboxgl from 'mapbox-gl';
import fetchFakeData from './data/fetchFakeData'
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = (props) => {

  const [center,setCenter] = useState([-74.5, 40])
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center, // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

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

  // var centerLat = 40.03;
  // var centerLon = -105.25;
  // var firstLoad = true;
  // mapboxgl.accessToken =
  //   "pk.eyJ1IjoiYmVuamVuc2VuIiwiYSI6ImNrYnBqMmxjajBtbzkzMG9mcWhqNWp3eW0ifQ.P7-NNo-uJymh-G--FyC9xA";
  // var myMap = new mapboxgl.Map({
  //   hash: true,
  //   zoom: 15,
  //   center: [centerLon, centerLat],
  //   container: "map1",
  //   style: "mapbox://styles/mapbox/satellite-v9",
  // });

  // useEffect(()=> {
  //   mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuamVuc2VuIiwiYSI6ImNrYnBqMmxjajBtbzkzMG9mcWhqNWp3eW0ifQ.P7-NNo-uJymh-G--FyC9xA';
  //   const map = new mapboxgl.Map({
  //   container: 'map2',
  //   style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  //   center: [-74.5, 40], // starting position [lng, lat]
  //   zoom: 9 // starting zoom
  //   });

  // })

  return (
    <div className="mapdiv">
      <div className="map-container" ref={mapContainerRef}/>
    </div>
  )
}

export default Map;