import {SET_INPUTEVENTOBJECT} from '../actions'

const inputEventObject = (state = [],action) => {
    switch(action.type){
        case SET_INPUTEVENTOBJECT:
            const inputEventObject = {
                day:action.day,
                title:action.title,
                place:action.place,
                url:action.url,
                allDayChecked:action.allDayChecked,
                startTime:action.startTime,
                endTime:action.endTime,
                memo:action.memo
            }            
            return inputEventObject
        default:
            return state
    }
}

export default inputEventObject