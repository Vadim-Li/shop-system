import { GET_USER,LOGIN_FAILURE } from "../constant";

const initState = {};
export default function loginReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case GET_USER:
      return {...data};
    case LOGIN_FAILURE:
      return {...data,loginFailure:true};
    default:
      return preState;
  }
}