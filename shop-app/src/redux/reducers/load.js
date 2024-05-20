import {LOADING,LOADED} from '../constant'

const initState = false
export default function loadReducer(preState=initState,action){
    const {type} = action
    switch(type){
        case LOADING:
            return true;
        case LOADED:
            return false;
        default:
            return preState;
    }
}