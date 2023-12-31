import { takeEvery, put, call } from "redux-saga/effects";
import { GET_ITEM, GET_ITEMDETAIL } from "../constant";
import axios from "axios";

function* watchSagaItem() {
  yield takeEvery(GET_ITEM, getItem);
}

function* getItem({id}) {
  let res = yield call(getItemAction, id);

  yield put({
    type: GET_ITEMDETAIL,
    data: res
  });
}

function getItemAction(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:8080/item/${id}`)
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
  
  export default watchSagaItem;