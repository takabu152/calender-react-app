import {CREATE_EVENT,DELETE_EVENT} from '../actions'

const events = (state = [],action) => {
    switch(action.type){
        case CREATE_EVENT:
            const event = {
                day:action.day,
                title:action.title,
                place:action.place,
                url:action.url,
                allDayChecked:action.allDayChecked,
                startTime:action.startTime,
                endTime:action.endTime,
                memo:action.memo
            }
            const length = state.length
            const id = length === 0 ? 1 : state[length - 1].id +1
            
            return [...state,{id,...event}]
        case DELETE_EVENT:
            //filterもmapと同じでstateの中の配列を展開して処理して配列を戻す
            console.log(action.id)
            console.log(state.filter(event => event.id != action.id))
            return state.filter(event => event.id != action.id)
        default:
            return state
    }
}

export default events