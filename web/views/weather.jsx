'use strict'

import React, {Component} from 'react'
import {render} from 'react-dom'
import {observer} from 'mobx-react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Snackbar from 'material-ui/Snackbar'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

import Rest from './stores/Rest'
import WeatherStoreConstructor from './stores/Weather'

/* Let this component be the inly one that uses the BackEnd info */
const props = window.props || {}
delete window.props

Rest.setApiKey(props.apikey)
const WeatherStore = new WeatherStoreConstructor(props.forecast.city, props.forecast.list)

import Error from './components/Error'
import CitiesList from './components/CitiesList'
import ForecastPerDays from './components/ForecastPerDays'

const styles = {
  main: {
    paddingTop: '2%',
    textAlign: 'center'
  }
}

const Weather = observer(class Weather extends Component {
  constructor (props) {
    super(props)

    this.state = {
      syncErrorMessage: '',
      isDisabled: false
    }

    this.sync = this.sync.bind(this)
  }

  sync (cityName) {
    this.setState({isDisabled: true})
    WeatherStore
      .sync(cityName)
      .subscribe({
        error: (error) => {
          this.setState({
            syncErrorMessage: `Unable to get Weather Forecast for city: ${cityName}`,
            isDisabled: false
          })
          console.error(error)
        },
        complete: () => this.setState({isDisabled: false})
      })
  }

  render () {
    const {errorMessage} = this.props
    const {syncErrorMessage, isDisabled} = this.state

    if (errorMessage) {
      return <Error message={errorMessage} />
    }

    return <div style={styles.main}>
      <CitiesList city={WeatherStore.city} onNewCity={this.sync} isDisabled={isDisabled} />
      <ForecastPerDays forecasts={WeatherStore.forecasts} />

      <Snackbar
        open={Boolean(syncErrorMessage)}
        message={syncErrorMessage}
        autoHideDuration={3000}
        onRequestClose={() => this.setState({syncErrorMessage: ''})}
      />
    </div>
  }
})

render((<MuiThemeProvider>
  <Weather {...props} />
</MuiThemeProvider>), document.getElementById('weather_app'))
