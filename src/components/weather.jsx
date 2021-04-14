import React, { Component } from "react";
import {
  roundTemp,
  convertDate,
  showIcon,
} from "../functions/weatherFunctions";

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      city: "Niš",
      state: "Serbia",
      today: {},
      daily: [],
    };

    /* this.getWeather(); */
  }

  async getWeather() {
    const data = await fetch("http://localhost:8080/weather/custom");
    const weatherdata = await data.json();
    const daily = weatherdata.weatherObject.daily;
    const today = daily[0];
    daily.shift();
    daily.pop();
    this.setState({
      loaded: true,
      daily: daily,
      today: today,
    });
  }

  async componentDidMount() {
    await this.getWeather();
  }

  render() {
    console.log(this.state);
    /* const date = this.state.daily[i].dt;
    const iconId = this.state.daily[i].weather[0].id;
    const dayTemp = this.state.daily[i].temp.day;
    const minTemp = this.state.daily[i].temp.mix;
    const maxTemp = this.state.daily[i].temp.max; */
    return (
      <div className="container">
        <div className="row card-row">
          <div className="card card-1 col-sm-12 mb-2 mr-0">
            <div className="card-body">
              {this.state.loaded && (
                <h5 className="card-text py-2">{this.state.daily[0].dt}</h5>
              )}
              <div className="weatherIcon py-4">
                <i className="wi wi-thunderstorm display-1"></i>
              </div>
            </div>
            <div>
              {this.state.loaded && (
                <h4 className="py-3">{this.state.daily[0].weather[0].main}</h4>
              )}
            </div>
            <div className="card-body">
              {this.state.loaded && (
                <h3 className="card-text py-3">
                  {this.state.daily[0].temp.day}&deg;C
                </h3>
              )}
              <div>
                <span className="px-5">
                  {this.state.loaded && (
                    <h5>Min {this.state.daily[0].temp.min}&deg;C</h5>
                  )}
                  {this.state.loaded && (
                    <h5>Max {this.state.daily[0].temp.max}&deg;C</h5>
                  )}
                </span>
              </div>
            </div>
          </div>
          {this.state.daily.map((day) => (
            <div className="card border-info shadow-2 mb-3 col-sm-6 mb-2 mr-0">
              <div className="card-body bg">
                <h5 className="card-text py-2">{convertDate(day.dt)}</h5>
                <div className="weatherIcon py-4">
                  {showIcon(day.weather[0].id)}
                </div>
                <h4 className="py-3">{day.weather[0].main}</h4>
                <div>
                  <h3 className="card-text py-2">
                    {roundTemp(day.temp.day)}&deg;C
                  </h3>
                  <div>
                    <span className="px-3">
                      <h5>Min {roundTemp(day.temp.min)}&deg;C</h5>
                      <h5>Max {roundTemp(day.temp.max)}&deg;C</h5>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Weather;
