import { SEARCH_ITEM } from "../constant";
import axios from "axios";
import { loading, loaded } from "../../redux/actions/load";
import {createError} from "../../redux/actions/error";

export const createSearchAction = (name, pageNum) => ({
  type: SEARCH_ITEM,
  name,
  pageNum
});

//异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的。
// export const createSearchAsyncAction = username => {
//   return dispatch => {
//     dispatch(loading())
//     dispatch(createError(false))
//     axios
//       .get(`https://api.github.com/search/users?q=${username}`)
//       .then(response => {
//         dispatch(createSearchAction(response.data.items));
//         dispatch(loaded())
//       })
//     .catch(error => {
//       dispatch(createError(error.message))
//       dispatch(loaded())
//     });
//   };
// };
