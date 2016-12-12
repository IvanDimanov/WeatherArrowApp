'use strict'

import {Observable} from 'rxjs'
import {action, extendObservable, useStrict} from 'mobx'

import Rest from './Rest'

useStrict(true)

function WeatherStore (city, forecasts) {
  const totalDays = 5
  extendObservable(this, {
    city,
    forecasts,
    lastSyncTime: 0,

    sync: (cityName) => Observable
      .create((observer) => Rest
        .get(`/api/weather/${encodeURIComponent(cityName)}/${totalDays}`)
        .subscribe({
          next: (data) => {
            action(() => {
              this.forecasts = data.list
              this.city = data.city
              this.lastSyncTime = new Date().toISOString()
            })()

            observer.next(data)
          },
          error: (error) => observer.error(error),
          complete: () => observer.complete()
        })
      )
  })
}

export default WeatherStore
