import { applyMiddleware, createStore, combineReducers } from "redux";
import reduxThunk from 'redux-thunk';

import { UserReducer } from './reducers/UserReducer';
import { ProductReducer } from './reducers/ProductReducer';
import { ColorReducer } from "./reducers/ColorReducer";
import { CategoryReducer } from "./reducers/CategoryReducer";
import { SizeReducer } from "./reducers/SizeReducer";


import { LoadingReducer } from './reducers/LoadingReducer';



const rootReducer = combineReducers({
    UserReducer,
    LoadingReducer,
    ProductReducer,
    ColorReducer,
    CategoryReducer,
    SizeReducer
})

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));