// function GetWeather(weatherlat, weatherlon) {
//     console.log("Weather JS Working");
//     // var weatherlat = e.features[0].geometry.coordinates[1];
//     // var weatherlon = e.features[0].geometry.coordinates[0];
//     $.get(
//       "https://api.openweathermap.org/data/2.5/weather?lat=" +
//         weatherlat +
//         "&lon=" +
//         weatherlon +
//         "&units=imperial&appid=f4dbb1940d4d4fef5f523a7b1bfc0dc6",
//       function (res) {
//         $(".lat").html(Math.round(weatherlat * 100) / 100);

//         $(".lon").html(Math.round(weatherlon * 100) / 100);

//         var temp = res.main.temp;
//         console.log(temp);
//         $(".temp").html(temp);

//         var skies = res.weather[0].main;
//         console.log(skies);
//         $(".skies").html(skies);

//         var wind = res.wind.speed;
//         console.log(wind);
//         $(".wind").html(wind + " miles/hour");
//       },
//       "json"
//     );
//   }
