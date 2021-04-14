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
    // console.log(this.state);
    return (
      <div className="container">
        <div className="row card-row">
          <div className="card card-1 col-sm-12 mb-2 mr-0">
            <div className="card-body bg-info">
              {this.state.loaded && (
                <h5 className="card-text py-2">
                  {convertDate(this.state.today.dt)}
                </h5>
              )}
              <div className="weatherIcon py-4">
                {this.state.loaded && showIcon(this.state.today.weather[0].id)}
              </div>

              <div>
                {this.state.loaded && (
                  <h4 className="py-3">{this.state.today.weather[0].main}</h4>
                )}
              </div>

              {this.state.loaded && (
                <h3 className="card-text py-3">
                  {roundTemp(this.state.today.temp.day)}&deg;C
                </h3>
              )}
              <div>
                <span className="px-5">
                  {this.state.loaded && (
                    <h5>Min {roundTemp(this.state.today.temp.min)}&deg;C</h5>
                  )}
                  {this.state.loaded && (
                    <h5>Max {roundTemp(this.state.today.temp.max)}&deg;C</h5>
                  )}
                </span>
              </div>
            </div>
          </div>

          {this.state.daily.map((day) => (
            <div className="card  mb-3 col-sm-6 mb-2 mr-0">
              <div className="card-body bg-info">
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
