import {ISERROR} from '../constant'

const initState = ""
export default function errorReducer(preState=initState,action){
    const {type,data} = action
    switch(type){
        case ISERROR:
            return data;
        default:
            return preState;
    }
}