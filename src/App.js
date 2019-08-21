import React, { Component, Fragment } from "react";
import axios from "axios";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

import WeatherList from "./WeatherList";
import "./css/App.css";

const weather_api_key = "b81db6432bb2b2d4ab273de0852795d6";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { country: "", region: "", weatherByCity: null };
  }

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ region: val }, this.getWeatherData);
  }

  getWeatherData = () => {
    const { region } = this.state;

    axios({
      method: "get",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${region}&appid=${weather_api_key}&units=metric`
    })
      .then(res => this.setState({ weatherByCity: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    const { country, region, weatherByCity } = this.state;

    return (
      <div className="app">
        <div className="app-main">
          <div className="selection">
            <p>Country:</p>
            <CountryDropdown
              className="select"
              value={country}
              onChange={val => this.selectCountry(val)}
            />
          </div>

          {country ? (
            <div className="selection">
              <p>City:</p>
              <RegionDropdown
                className="select"
                country={country}
                value={region}
                onChange={val => this.selectRegion(val)}
              />
            </div>
          ) : null}

          {weatherByCity ? (
            <Fragment>
              <WeatherList data={weatherByCity} />
              <button className="btn">Save</button>
            </Fragment>
          ) : null}
        </div>

        <div>Weather</div>
      </div>
    );
  }
}

export default App;
