import { takeEvery, put, call } from "redux-saga/effects";
import { SEARCH_ITEM, GET_ITEMBYLIKE } from "../constant";

import { loading, loaded } from "../../redux/actions/load";
import { createError } from "../../redux/actions/error";
import axios from "axios";
import { BASE_URI } from "../constant";

function* watchSagaSearch() {
  yield takeEvery(SEARCH_ITEM, getItems);
}

function* getItems({ name, pageNum }) {
  yield put(loading());
  yield put(createError(false));

  let res = yield call(getItemAction, name, pageNum);

  yield put(loaded());

  if (res.type === "isError") {
    yield put(res);
    yield put(loaded());
  } else {
    yield put({
      type: GET_ITEMBYLIKE,
      data: res
    });
  }
}

function getItemAction(name, pageNum) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URI}/item/getItemByLike/${pageNum}`, {
        name
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(createError(error.message));
      });
  }).catch(function(err) {
    return err;
  });
}

export default watchSagaSearch;
