import { GET_ITEMDETAIL } from "../constant";

const initState = {};
export default function itemReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case GET_ITEMDETAIL:
      return {...data};
    default:
      return preState;
  }
}