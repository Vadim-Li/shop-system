import { GET_ITEMCATDETAIL } from "../constant";

const initState = {};
export default function itemCatReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case GET_ITEMCATDETAIL:
      return {...data};
    default:
      return preState;
  }
}