/* global btoa $ */
'use strict'

import {Observable} from 'rxjs'

/* Used as Basic Auth for every BackEdn call */
let apikey = ''

function ajax (options) {
  if (!options.headers ||
      typeof options.headers !== 'object'
  ) {
    options.headers = {}
  }

  options.headers['Authorization'] = `Basic ${btoa(apikey + ':')}`

  return Observable.create((observer) => {
    $.ajax(options)
      .success((data, textStatus, jqXHR) => observer.next(data, {data, textStatus, jqXHR}) || observer.complete())
      .fail((jqXHR, textStatus, errorThrown) => {
        errorThrown && console.error(errorThrown)
        observer.error(jqXHR.responseJSON, {errorThrown, textStatus, jqXHR})
      })
  })
}

/* Short-hand AJAX GET */
function get (arg) {
  const options = {method: 'GET'}

  if (arg) {
    if (typeof arg === 'object') {
      delete arg.method
      Object.assign(options, arg)
    }
    if (typeof arg === 'string') {
      options.url = arg
    }
  }

  return ajax(options)
}

/* Short-hand AJAX POST */
function post (arg) {
  const options = {method: 'POST'}

  if (arg) {
    if (typeof arg === 'object') {
      delete arg.method
      Object.assign(options, arg)
    }
    if (typeof arg === 'string') {
      options.url = arg
    }
  }

  return ajax(options)
}

function setApiKey (_apikey) {
  apikey = String(_apikey)
}

const Rest = {
  ajax,
  get,
  post,
  setApiKey
}

export default Rest
