import { applyMiddleware, createStore, combineReducers } from "redux";
import reduxThunk from 'redux-thunk';
import { UserReducer } from './reducers/UserReducer';
import { ProductReducer } from './reducers/ProductReducer';

import { LoadingReducer } from './reducers/LoadingReducer';


const rootReducer = combineReducers({
    UserReducer,
    LoadingReducer,
    ProductReducer,
})

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));