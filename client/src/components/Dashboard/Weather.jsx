import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = (props) => {
  const [weather, setWeather] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${props.weatherlat}&lon=${props.weatherlon}&units=imperial&appid=f4dbb1940d4d4fef5f523a7b1bfc0dc6`
      )
      .then((res) => {
        console.log(res.data);
        console.log(res.data.weather[0].description);
        setWeather(res.data.weather[0].description);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <p>your weather:{weather}</p>
    </div>
  );
};

export default Weather;
