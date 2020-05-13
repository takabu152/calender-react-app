import {CREATE_EVENT,DELETE_EVENT} from '../actions'

const events = (state = [],action) => {
    switch(action.type){
        case CREATE_EVENT:
            const event = {
                day:action.day,
                title:action.title,
                place:action.place,
                allDayChecked:action.allDayChecked,
                starttime:action.starttime,
                endtime:action.endtime
            }
            const length = state.length
            const id = length === 0 ? 1 : state[length - 1].id +1
            
            return [...state,{id,...event}]
        case DELETE_EVENT:
            //filterもmapと同じでstateの中の配列を展開して処理して配列を戻す
            return state.filter(event => event.id != action.id)
        default:
            return state
    }
}

export default events