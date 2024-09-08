import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "../assets/Search.png";
import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import humidityIcon from "../assets/humidity.png";

import React from "react";

const WeatherDeatails = ({icon,temp,city,country,lat,log,wind,humidity,}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="Image" height="100px" width="100px" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">latitude</span>
          <span>{lat}</span>
          </div>
          <div>
          <span className="log">longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img
            src={humidityIcon}
            alt="humitidy"
            width={100}
            height={100}
            className="icon"
          />
          <div className="data">
            <div className="humidity-percentage">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img
            src={windIcon}
            alt="wind image"
            width={100}
            height={100}
            className="wind"
          />
          <div className="data">
            <div className="wind-percentage">{wind} Kmph</div>
            <div className="text">wind</div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  const apikey = "75d756bab73f1670470fddb041740183";

  const [error, setError] = useState(null);
  const [text, setText] = useState("chennai");
  const [icon, setIcon] = useState(cloudIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState();
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [wind, setWind] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03n": drizzleIcon,
    "03d": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "13d": snowIcon,
    "13n": snowIcon,
    "09n": rainIcon,
    "09d": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
  };

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=Metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      if (data.cod == "404") {
        console.log("City Not Found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLog(data.coord.lon);
      setLat(data.coord.lat);
      const weatherIconcode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconcode] || clearIcon);
      setCityNotFound(false);
    } catch (error) {
      console.log("an error occured", error.message);
      setError(false);
    } finally {
    }
    setLoading(false);
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };
  const handleKeyDown = (ev) => {
    if (ev.key === "Enter");
    search();
  };
  useEffect(function () {
    search();
  }, []);
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            className="cityInput"
            placeholder="Search city"
            onChange={handleCity}
            value={text}
            onKeyDown={handleKeyDown}
          />
          <div
            className="search-icon"
            onClick={() => {
              search();
            }}
          >
            <img src={searchIcon} alt="search " height={20} />
          </div>
        </div>
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {cityNotFound && <div className="cityn">city not found</div>}
        {!loading && !cityNotFound && (
          <WeatherDeatails
            icon={icon}
            temp={temp}
            city={city}
            country={country}
            lat={lat}
            log={log}
            wind={wind}
            humidity={humidity}
          />
        )}
        <p className="copy">
          Desined by <b>surya</b>
        </p>
      </div>
    </>
  );
}

export default App;
