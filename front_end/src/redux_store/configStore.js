import { applyMiddleware, createStore, combineReducers } from "redux";
import reduxThunk from 'redux-thunk';
import { UserReducer } from './reducers/UserReducer';
import { LoadingReducer } from './reducers/LoadingReducer';


const rootReducer = combineReducers({
    UserReducer,
    LoadingReducer,
})

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));