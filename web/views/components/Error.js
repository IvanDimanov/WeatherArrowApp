'use strict'

import React from 'react'

import Paper from 'material-ui/Paper'
import PageIcon from 'material-ui/svg-icons/image/broken-image'

const styles = {
  paper: {
    width: 400,
    textAlign: 'center',
    margin: '2% auto',
    padding: '10px 10px 30px 10px'
  },

  title: {
    lineHeight: '50px'
  },

  titleText: {
    verticalAlign: 'super'
  }
}

const Error = ({message}) => <Paper style={styles.paper} zDepth={1}>
  <h3 style={styles.title}>
    <PageIcon />
    <span style={styles.titleText}>Process Error</span>
  </h3>
  {message}
</Paper>

export default Error
