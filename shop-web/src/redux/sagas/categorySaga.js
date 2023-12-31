import { takeEvery, put, call } from "redux-saga/effects";
import { GET_CATEGORY, GET_PAGE } from "../constant";
import axios from "axios";

function* watchSagaCategory() {
  yield takeEvery(GET_CATEGORY, getCategorys);
}

function* getCategorys({ cid, pageNum }) {
  let res = yield call(getCategoryAction, cid, pageNum);

  yield put({
    type: GET_PAGE,
    data: res
  });
}

function getCategoryAction(cid, pageNum) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:8080/item/${cid}/${pageNum}`)
        .then(response => {         
          resolve(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }).catch(function(err) {
      return err;
    });
  }
  
  export default watchSagaCategory;
