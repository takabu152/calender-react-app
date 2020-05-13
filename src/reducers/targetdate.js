import {SET_TARGETDATE} from '../actions'

const targetdate = (state = [],action) => {
    switch(action.type){
        case SET_TARGETDATE:
            const targetdate = action.targetdate
            return targetdate
        default:
            return state
    }
}

export default targetdate