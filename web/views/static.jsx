'use strict'

import React, {Component} from 'react'

class Static extends Component {
  render () {
    return <html lang={'en'}>
      <head>
        <meta charSet={'utf-8'} />
        <meta content={'IE=edge,chrome=1'} httpEquiv={'X-UA-Compatible'} />
        <meta name={'viewport'} content={'width=device-width, initial-scale=1'} />

        <title>Weather App - Powered by Appcelerator Arrow</title>

        <link rel={'shortcut icon'} type={'image/ico'} href={'images/favicon.ico'} />
        <link rel={'stylesheet'} href={'https://fonts.googleapis.com/css?family=Roboto:300,400,500'} /> 
        <style>
          html, body, #weather_app {`{
            width  : 100%;
            height : 100%;
            margin : 0;
            padding: 0;
          }`}
        </style>

        <script
          type={'text/javascript'}
          dangerouslySetInnerHTML={{
            __html: `window.props = ${JSON.stringify(this.props)}`
          }}
        />
      </head>
      <body>
        <main id={'weather_app'} />

        {/* Used as AJAX lib */}
        <script type={'text/javascript'} src={'/assets/js/jquery.min.js'}></script>

        {/* React App JS */}
        <script type={'text/javascript'} src={'/assets/js/weather.bundle.js'}></script>
      </body>
    </html>
  }
}

export default Static
