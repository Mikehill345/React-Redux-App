import React, { useEffect, useState } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard'
import { fetchWeather } from './actions/index'
import { connect } from 'react-redux'
import WeatherForm from './components/WeatherForm'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner'


const App = (props) => {
  const { fetchWeather } = props;

  useEffect(() => {

    fetchWeather(props.woeid);
  }, [fetchWeather, props.woeid]);

  const renderLoader = () => {
    return (
      <>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={115}
          timeout={3000} //3 secs
        />
      </>
    );
  };


  return (
    <div className="App">

      <h1>Look up your Weather!</h1>
      <WeatherForm />

      <h2>{props.weather.title}</h2>

      {props.isLoading ? (
        renderLoader()
      ) : (
          props.weather.consolidated_weather.map((forecast, index) => {
            return <WeatherCard forecast={forecast} key={index} />;
          })
        )}
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    weather: state.weather,
    woeid: state.woeid,
    isLoading: state.isLoading,
  };
};
export default connect(mapStateToProps, { fetchWeather })(App);