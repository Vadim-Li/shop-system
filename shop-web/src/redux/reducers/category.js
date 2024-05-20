import { GET_PAGE } from "../constant";

const initState = {};
export default function categoryReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case GET_PAGE:
      return {...data};
    default:
      return preState;
  }
}