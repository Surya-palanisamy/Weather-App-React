const WeatherDetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  log,
  wind,
  humidity,
}) => {
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

export default WeatherDetails;
