import {combineReducers} from 'redux'

import events from './events.js'
import targetdate from './targetdate.js'
import inputEventObject from './inputEventObject.js'
import popOverState from './popOverState.js'

export default combineReducers({ events,targetdate,inputEventObject,popOverState })

