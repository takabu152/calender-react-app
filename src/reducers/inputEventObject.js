import {SET_INPUTEVENTOBJECT, 
    SET_DAY ,
    SET_TITLE,
    SET_PLACE,
    SET_URL,
    SET_ALLDAYCHECKED,
    SET_STARTTIME,
    SET_ENDTIME,
    SET_MEMO
} from '../actions'

const inputEventObject = (state = [],action) => {
    switch(action.type){
        case SET_INPUTEVENTOBJECT:
            const inputEventObject = {
                id:action.id,
                day:action.day,
                title:action.title,
                place:action.place,
                url:action.url,
                allDayChecked:action.allDayChecked,
                startTime:action.startTime,
                endTime:action.endTime,
                memo:action.memo
            }
            console.log('state確認')
            console.log(state)
            return inputEventObject
        case SET_DAY:
            state.day = action.day
            return state
        case SET_TITLE:
            state.title = action.title
            return state
        case SET_PLACE:
            console.log(action)
            state.place = action.place
            return state
        case SET_URL:
            state.url = action.url
            return state
        case SET_ALLDAYCHECKED:
            state.allDayChecked = action.allDayChecked
            return state
        case SET_STARTTIME:
            state.startTime = action.startTime
            return state
        case SET_ENDTIME:
            state.endTime = action.endTime
            return state
        case SET_MEMO:
            console.log(action)
            state.memo = action.memo
            return state
        default:
            return state
    }
}

export default inputEventObject