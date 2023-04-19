import { combineReducers, applyMiddleware} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer } from './reducers/productReducers'

const reducer = combineReducers({
    productList: productListReducer,
})

const initialState = {}

const middleware = [thunk]

const store = configureStore({reducer}, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store