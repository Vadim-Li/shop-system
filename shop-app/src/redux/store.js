//引入createStore,专门用于创建redux中最为核心的store对象
import {createStore,applyMiddleware, combineReducers} from 'redux'
//引入redux-thunk,用于支持异步action
import createSagaMidlleWare from 'redux-saga'
import watchSaga from './sagas/saga'
import loginReducer from './reducers/login'
import firstReducer from './reducers/first'
import itemReducer from './reducers/item'
import itemCatReducer from './reducers/itemCat'
import categoryReducer from './reducers/category'
import searchReducer from './reducers/search'

import {persistStore,persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sagaMidlleWare = createSagaMidlleWare()

const allReducer = combineReducers({
    login:loginReducer,
    first:firstReducer,
    category:categoryReducer,
    item:itemReducer,
    itemCat:itemCatReducer,
    itemBySearch:searchReducer,
})
const persistConfig = {
    key:'root',
    storage:AsyncStorage
}
const myPersistReduser=persistReducer(persistConfig,allReducer)
//暴露store
const store = createStore(myPersistReduser,applyMiddleware(sagaMidlleWare))

sagaMidlleWare.run(watchSaga)

export const persistor = persistStore(store)

export default store