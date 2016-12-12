'use strict'

import React from 'react'

import Paper from 'material-ui/Paper'
import WindIcon from 'material-ui/svg-icons/hardware/toys'
import HumidityIcon from 'material-ui/svg-icons/action/opacity'

const styles = {
  Paper: {
    display: 'inline-block',
    width: 200,
    margin: 5,
    padding: 5
  },

  title: {
    textAlign: 'center'
  },

  partLeft: {
    display: 'inline-block',
    width: '60%',
    verticalAlign: 'top',
    textAlign: 'center'
  },

  partRight: {
    display: 'inline-block',
    width: '40%',
    textAlign: 'left',
    verticalAlign: 'top',
    fontSize: 12,
    lineHeight: 3,
    padding: '15px 0'
  },

  weatherIcon: {
    display: 'block',
    width: 100,
    margin: '-20px auto -10px auto'
  },

  WindIcon: {
    display: 'inline'
  },

  HumidityIcon: {
    display: 'inline'
  },

  iconLabel: {
    verticalAlign: 'super',
    paddingLeft: 3
  }
}

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const ForecastPerDays = ({forecasts}) => <div>{
  forecasts.map((forecast, index) => <Paper
    key={index}
    style={styles.Paper}
    zDepth={1}
  >
    <h4 style={styles.title}>{dayNames[new Date(forecast.dt_txt).getDay()]}</h4>

    <div style={styles.partLeft}>
      <img
        src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
        alt={forecast.weather[0].description}
        style={styles.weatherIcon}
      />
      <b>{forecast.main.temp} <sup>0</sup>C</b>
    </div>

    <div style={styles.partRight}>
      <WindIcon style={styles.WindIcon} />
      <span style={styles.iconLabel}>{forecast.wind.speed} m/s</span>
      <br />

      <HumidityIcon style={styles.HumidityIcon} />
      <span style={styles.iconLabel}>{forecast.main.humidity}%</span>
    </div>
  </Paper>)
}</div>

export default ForecastPerDays
