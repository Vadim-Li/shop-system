import { takeEvery, put, call } from "redux-saga/effects";
import { GET_ITEMCAT, GET_ITEMCATDETAIL } from "../constant";
import axios from "axios";

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
        .get(`http://localhost:8080/itemCat/${cid}`)
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