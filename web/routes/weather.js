const Arrow = require('arrow');

const WeatherRoute = Arrow.Router.extend({
	name: 'weather',
	path: '/',
	method: 'GET',
	description: 'Renders the Weather Forecast HTML page with preset Weather data',
	action: function (req, resp, next) {
		const defaultCityName = 'Sofia'
		req.server
			.getAPI('api/weather/:cityName/:totalDays', 'GET')
			.execute({
				cityName: defaultCityName
			}, function (error, forecast) {
				if (error) {
					resp.render('static', {
						errorMessage: `We are unable to show you the Weather Forecast for ${defaultCityName}, please excuse us and try again later.`
					})
					next(error)
					return
				}

				resp.render('static', {
					apikey: req.server.get('apikey'),	/* Let the FrontEnd be able to make BackEnd calls */
					forecast							/* Feed the component as part of the React.j BackEnd rendering */
				})
				next()
			});
	}
});

module.exports = WeatherRoute;
