import {ISFIRST,NOFIRST} from '../constant'

const initState = true
export default function firstReducer(preState=initState,action){
    const {type} = action
    switch(type){
        case ISFIRST:
            return true;
        case NOFIRST:
            return false;
        default:
            return preState;
    }
}