import {all} from 'redux-saga/effects'
import watchSagaLogin from './loginSaga'
import watchSagaCategory from './categorySaga'
import watchSagaItem from './itemSaga'
import watchSagaItemCat from './itemCatSaga'
import watchSagaSearch from './sagaSearch'

function* watchSaga(){
    yield all([watchSagaLogin(),watchSagaCategory(),watchSagaItem(),watchSagaItemCat(),watchSagaSearch()])

}

export default watchSaga