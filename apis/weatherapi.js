const Arrow = require('arrow');
const request = require('request');

const WeatherAPI = Arrow.API.extend({
	group: 'weatherapi',
	path: '/api/weather/:cityName/:totalDays',
	method: 'GET',
	description: 'Uses "Open Weather Map" API in order to return Forecast for any given City',
	parameters: {
		cityName: {
			description: 'What is the location/city we need to return the Weather Forecast'
		},
		totalDays: {
			optional: true,
			description: 'For how many future days we need to return the Weather Forecast'
		}
	},
	action: function (req, resp, next) {
		let {cityName, totalDays} = req.params
		cityName = String(cityName || '')
		totalDays = parseInt(totalDays) || 5

		if (!cityName) {
			const error = new TypeError('Missing mandatory parameter "cityName"')
			error.status = 400
			next(error)
			return
		}

		const params = {
			q: cityName,
			cnt: totalDays * 8,		/* Forecast is given for every 3 hours */
			units: 'metric',
			appid: req.server.get('weatherApi')
		}
		const options = {
			method: 'GET',
			uri: 'http://api.openweathermap.org/data/2.5/forecast',
			qs: params
		}

		request(options, (error, forecastResponse) => {
			if (error) {
				const error = new Error(`Unable to get Weather Forecast with params ${JSON.stringify(params)}: ${error.stack}`)
				error.status = 500
				next(error)
				return
			}

			let forecast
			try {
				forecast = JSON.parse(forecastResponse.body)
			} catch (error) {
				const error = new ReferenceError(`Unable to parse Weather Forecast response with params ${JSON.stringify(params)}: ${error.stack}`)
				error.status = 500
				next(error)
				return
			}

			/* Leave only midday Forecast as a central for the entire day */
			forecast.list = forecast.list.filter((item) => item.dt_txt.indexOf('12:00:00') !== -1)

			resp.json(forecast)
			next()
		})
	}
});

module.exports = WeatherAPI;
