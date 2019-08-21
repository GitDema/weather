import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import axios from "axios";

import { addCityToList, removeCityFromList } from "./redux/actions";
import WeatherList from "./WeatherList";
import "./css/App.css";

const weather_api_key = "b81db6432bb2b2d4ab273de0852795d6";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      region: "",
      searchError: "",
      weatherByCity: null
    };
  }

  selectCountry(val) {
    this.setState({ country: val, searchError: false, weatherByCity: false });
  }

  selectRegion(val) {
    this.setState(
      { region: val, searchError: false, weatherByCity: false },
      this.getWeatherData
    );
  }

  getWeatherData = () => {
    const { region } = this.state;

    axios({
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
      },
      url: `http://api.openweathermap.org/data/2.5/weather?q=${region}&appid=${weather_api_key}&units=metric`
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({ weatherByCity: res.data });
        }
      })
      .catch(err => {
        this.setState({ searchError: "City not found" });
      });
  };

  handleSave = cityWeather => {
    this.props.addCityToList(cityWeather);
    this.setState({ weatherByCity: null, country: "", region: "" });
  };

  render() {
    const { country, region, searchError, weatherByCity } = this.state;
    const { savedWeathers, removeCityFromList } = this.props;

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

          {searchError && <p style={{ color: "#af0707" }}>{searchError}</p>}

          {weatherByCity ? (
            <Fragment>
              <WeatherList data={weatherByCity} />
              <button
                className="btn"
                onClick={() => this.handleSave(weatherByCity)}
              >
                Save
              </button>
            </Fragment>
          ) : null}
        </div>

        {savedWeathers.length > 0 ? (
          <div>
            <h2>Saved Cities:</h2>
            {savedWeathers.map((city, index) => (
              <div>
                <div className="saved-list__item">
                  <p key={index}>{city.name}</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${
                      city.weather[0].icon
                    }@2x.png`}
                    alt="icon"
                    style={{ height: 50 }}
                  />
                  <p>{Math.round(city.main.temp)} &#8451;</p>
                  <div
                    class="cross-wrap"
                    onClick={() => removeCityFromList(index)}
                  >
                    <div class="cross" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    savedWeathers: state.savedWeathers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCityToList: city => {
      dispatch(addCityToList(city));
    },
    removeCityFromList: cityIndex => {
      dispatch(removeCityFromList(cityIndex));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
