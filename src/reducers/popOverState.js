import {SET_POPOVERSTATE} from '../actions'

const popOverState = (state = [],action) => {
    switch(action.type){
        case SET_POPOVERSTATE:
            const popOverState = action.popOverState
            return popOverState
        default:
            return state
    }
}

export default popOverState