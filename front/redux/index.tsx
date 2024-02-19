import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenReducer from './tokenSlice'


const store = configureStore({
    reducer: { token: tokenReducer }
})