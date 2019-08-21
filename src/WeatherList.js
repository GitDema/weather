import React from "react";

import "./css/WeatherData.css";

const dataList = ({ data }) => {
  return (
    <div className="weather-data">
      <div className="weather-data-main">
        <img
          src={`http://openweathermap.org/img/wn/${
            data.weather[0].icon
          }@2x.png`}
          alt="icon"
        />
        <p>{data.weather[0].description}</p>
      </div>

      <ul className="weather-data-list">
        <li className="weather-data-list_item">
          <p className="weather-data-list_item-title">
            Temperature <span>(&#8451;)</span>:
          </p>
          <p className="weather-data-list_item-value">
            {Math.round(data.main.temp)}
          </p>
        </li>
        <li className="weather-data-list_item">
          <p className="weather-data-list_item-title">
            Wind <span>(meter/sec)</span>:
          </p>
          <p className="weather-data-list_item-value">
            {Math.round(data.wind.speed)}
          </p>
        </li>
        <li className="weather-data-list_item">
          <p className="weather-data-list_item-title">
            Humidity <span>(%)</span>:
          </p>
          <p className="weather-data-list_item-value">{data.main.humidity}</p>
        </li>
        <li className="weather-data-list_item">
          <p className="weather-data-list_item-title">
            Coordinates <span>(long/lat)</span>:
          </p>
          <p className="weather-data-list_item-value">
            {data.coord.lon} / {data.coord.lat}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default dataList;
