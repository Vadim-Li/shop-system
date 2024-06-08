import { takeEvery, put, call } from "redux-saga/effects";
import { GET_ITEMCAT, GET_ITEMCATDETAIL } from "../constant";
import axios from "axios";
import { BASE_URI } from "../constant";

function* watchSagaItemCat() {
  yield takeEvery(GET_ITEMCAT, getItemCat);
}

function* getItemCat({cid}) {
  let res = yield call(getItemCatAction, cid);

  yield put({
    type: GET_ITEMCATDETAIL,
    data: res
  });
}

function getItemCatAction(cid) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${BASE_URI}/itemCat/${cid}`)
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
  
  export default watchSagaItemCat;