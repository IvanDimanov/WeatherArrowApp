const path = require('path')
const webpack = require('webpack')

var Arrow = require('arrow'),
	server = new Arrow();

// lifecycle examples
server.on('starting', function () {
	server.logger.debug('server is starting!');
});

server.on('started', function () {
	server.logger.debug('server started!');
});

// start the server
server.start();

const compiler = webpack({
	entry: {
		weather: './web/views/weather.jsx',
	},

	output: {
		path: path.resolve('./web/public'),
		filename: 'assets/js/[name].bundle.js'
	},

	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|theme)/,
			loader: 'babel',
			query: {
				presets: ['react', 'latest']
			}
		}]
	}
})

compiler.watch({}, (error, stats) => {
	if (error) {
		console.error(error)
		return
	}

	console.log(stats.toString({
		chunks: false,  // Makes the build much quieter
		colors: true    // Shows colors in the console
	}))

	if (error || stats.hasErrors()) {
		console.error('Error in building FrontEnd')
		return
	}

	console.log('FrontEnd successfully built')				
})
