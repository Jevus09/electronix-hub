import { combineReducers, applyMiddleware} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer'



const carItemsFromStorage = localStorage.getItem('cartITems') ? JSON.parse(localStorage.getItem('cartITems')) : []

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
})

const initialState = {
    cart:{cartItems: carItemsFromStorage},
}

const middleware = [thunk]

const store = configureStore({reducer}, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store