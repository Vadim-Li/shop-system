import { takeEvery, put, call } from "redux-saga/effects";
import { VERIFY_USER, GET_USER,LOGIN_FAILURE } from "../constant";
import axios from "axios";
import { BASE_URI } from "../constant";

function* watchSagaLogin() {
  yield takeEvery(VERIFY_USER, getUsers);
}

function* getUsers({ username, password }) {
  let res = yield call(getUserAction, username, password);
  if(res.code===200){
    yield put({
      type: GET_USER,
      data: res
    });
  }else if(res.code===400){
    yield put({
      type: LOGIN_FAILURE,
      data:res
    });
  }
  
}

function getUserAction(username, password) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URI}/user/login`, {
        username: username,
        password: password
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        // alert("登录失败，请重试");
      });
  }).catch(function(err) {
    return err;
  });
}

export default watchSagaLogin;
export { getUsers };
