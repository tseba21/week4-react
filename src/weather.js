import React, { useState } from "react";
import axios from "axios";

export default function Form() {
  const [city, setCity] = useState(" ");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState(" ");

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      Description: response.data.weather[0].description,
      Temperature: Math.round(response.data.main.temp),
      Wind: Math.round(response.data.wind.speed),
      Humidity: Math.round(response.data.main.humidity),
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(displayWeather);
  }

  function queryCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div className="Form">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={queryCity} />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
  if (loaded) {
    return (
      <div>
        {form}
        <br />
        <ul>
          <li>{weather.Description}</li>
          <li>Temperature: {weather.Temperature}ºC</li>
          <li>Wind: {weather.Wind} km/h</li>
          <li>Humidity: {weather.Humidity}%</li>
          <li>
            <img src={weather.icon} alt="Weather Icon" />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
