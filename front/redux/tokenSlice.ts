import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: ''
    },
    reducers: {
        setToken(state, action){},
        getToken(state, action){},
        deleteToken(state, action){}
    }
})

export const {setToken, getToken, deleteToken} = tokenSlice.actions

export default tokenSlice.reducer