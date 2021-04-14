import React, { Component } from "react";

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      city: "Niš",
      state: "Serbia",
      // today: {},
      daily: [],
    };

    /* this.getWeather(); */
  }

  async getWeather() {
    const data = await fetch("http://localhost:8080/weather/custom");
    const wdata = await data.json();
    this.setState({
      loaded: true,
      // today: wdata.weatherObject.today,
      daily: wdata.weatherObject.daily,
    });
    console.log(this.state.daily);
  }

  async componentDidMount() {
    await this.getWeather();
  }

  render() {
    return (
      <div className="container py-5 bg-primary">
        <div className="card">
          <div className="card-body">
            <h3 className="card-text py-2">{this.state.city}</h3>
            <h3 className="card-text py-2">{this.state.state}</h3>
          </div>
          <div className="weatherIcon py-4">
            <i className="wi wi-day-fog display-1"></i>
            {this.state.loaded && (
              <h4 className="py-3">{this.state.today.weather[0].main}</h4>
            )}
          </div>
          <div className="card-body">
            <h1 className="card-text py-2">{this.state.today.temp}&deg;C</h1>
            {this.state.loaded &&
              minmaxTemp(
                this.state.daily[0].temp.max,
                this.state.daily[0].temp.min
              )}
          </div>
        </div>
        {/* <div>
          <div className="container-fluid">
            <div className="row card-row">
              
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

function minmaxTemp(min, max) {
  return (
    <h3>
      <span className="px-3">{min}&deg;C</span>
      <span className="px-3">{max}&deg;C</span>
    </h3>
  );
}

export default Weather;
