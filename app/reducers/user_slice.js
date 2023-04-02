import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

function getFromLocalStorage() {
    try {
        const serializedStore = localStorage.getItem("store");
        if (serializedStore === null) {
            return {loading: false, userInfo: {}};
        }
        return JSON.parse(serializedStore).user;
    } catch (e) {
        return {loading: false, userInfo: {}};
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState: getFromLocalStorage(),
    reducers: {
        loginRequest: (state) => {
            state.loading = true
            state.userInfo = {}
        },
        loginFail: (state) => {
            state.user = {loading: false, userInfo: {}}
        },
        login: (state, action) => {
            console.log("inside login reducer", action.payload)
            // state.user = {loading: false, userInfo: action.payload
            state.loading = false
            state.userInfo = action.payload
        },
        logout: (state) => {
            state.user = {loading: false, userInfo: {}}
        }
    }
})
export const {signup, loginRequest, login, logout, loginFail} = userSlice.actions
export const userReducer = userSlice.reducer

export const loginThunk = (email, password) => async (dispatch) => {
    try {
        console.log("here", email, password)

        dispatch(loginRequest())
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post(
            "http://localhost:8080/api/users/login",
            {email, password},
            config
        )
        console.log(data)
        dispatch(login(data))
    } catch (e) {
        dispatch(loginFail())
    }
}