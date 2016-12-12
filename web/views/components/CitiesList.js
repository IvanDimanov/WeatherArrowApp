'use strict'

import React from 'react'

import AutoComplete from 'material-ui/AutoComplete'
import IconButton from 'material-ui/IconButton'
import SyncIcon from 'material-ui/svg-icons/notification/sync'

const cityNames = ['Sofia', 'London', 'New York', 'Moscow']

const CitiesList = ({city, onNewCity, isDisabled}) => <div>
  <AutoComplete
    floatingLabelText={'Weather location'}
    filter={AutoComplete.noFilter}
    openOnFocus
    dataSource={cityNames}
    searchText={city.name}
    onNewRequest={(cityName) => {
      if (typeof onNewCity === 'function') onNewCity(cityName)
    }}
    disabled={isDisabled}
  />

  <IconButton
    onTouchTap={() => {
      if (typeof onNewCity === 'function') onNewCity(city.name)
    }}
    disabled={isDisabled}
  >
    <SyncIcon />
  </IconButton>
</div>

export default CitiesList
