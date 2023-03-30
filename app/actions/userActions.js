import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT} from "../constants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })
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
        dispatch({type: USER_LOGIN_SUCCESS, payload: data})
    } catch (e) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.detail : e.message
        })
    }
}
export const logout=()=> async (dispatch)=>{
    console.log('logout called')
    dispatch({
        type: USER_LOGOUT,
    })
}