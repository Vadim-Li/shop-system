import { GET_ITEMBYLIKE } from "../constant";

const initState = [];

export default function searchReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case GET_ITEMBYLIKE:
      return {...data};
    default:
      return preState;
  }
}
